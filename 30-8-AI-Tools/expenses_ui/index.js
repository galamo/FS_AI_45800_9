const STORAGE_KEY = "expense-ledger";
const CATEGORIES = ["food", "vacations", "bills", "other"];

const form = document.querySelector("#expense-form");
const nameInput = document.querySelector("#expense-name");
const priceInput = document.querySelector("#expense-price");
const categorySelect = document.querySelector("#expense-category");
const formError = document.querySelector("#form-error");
const expensesBody = document.querySelector("#expenses-body");
const emptyState = document.querySelector("#empty-state");
const categoryReport = document.querySelector("#category-report");
const grandTotalEl = document.querySelector("#grand-total");

const loadExpenses = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveExpenses = (expenses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

const formatMoney = (amount) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(amount);

const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(year, month - 1, day));
};

const todayIso = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const categoryLabel = (category) =>
  category.charAt(0).toUpperCase() + category.slice(1);

const createId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `exp-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const aggregateByCategory = (expenses) => {
  const totals = Object.fromEntries(
    CATEGORIES.map((category) => [category, { total: 0, count: 0 }])
  );

  for (const { category, price } of expenses) {
    if (!totals[category]) continue;
    totals[category].total += price;
    totals[category].count += 1;
  }

  return totals;
};

const showFormError = (message) => {
  formError.hidden = false;
  formError.textContent = message;
};

const clearFormError = () => {
  formError.hidden = true;
  formError.textContent = "";
};

const renderReport = (expenses) => {
  const totals = aggregateByCategory(expenses);
  const grandTotal = expenses.reduce((sum, { price }) => sum + price, 0);
  grandTotalEl.textContent = formatMoney(grandTotal);

  const fragment = document.createDocumentFragment();

  for (const category of CATEGORIES) {
    const { total, count } = totals[category];
    const li = document.createElement("li");
    li.dataset.category = category;

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = categoryLabel(category);

    const amount = document.createElement("span");
    amount.className = "amount";
    amount.textContent = formatMoney(total);

    const countEl = document.createElement("span");
    countEl.className = "count";
    countEl.textContent = `${count} item${count === 1 ? "" : "s"}`;

    li.append(label, amount, countEl);
    fragment.append(li);
  }

  categoryReport.replaceChildren(fragment);
};

const renderTable = (expenses) => {
  const sorted = [...expenses].sort((a, b) => {
    if (a.date === b.date) return b.createdAt - a.createdAt;
    return a.date < b.date ? 1 : -1;
  });

  emptyState.hidden = sorted.length > 0;

  const fragment = document.createDocumentFragment();

  for (const expense of sorted) {
    const tr = document.createElement("tr");
    tr.dataset.id = expense.id;

    const nameTd = document.createElement("td");
    nameTd.textContent = expense.name;

    const priceTd = document.createElement("td");
    priceTd.textContent = formatMoney(expense.price);

    const categoryTd = document.createElement("td");
    const pill = document.createElement("span");
    pill.className = "category-pill";
    pill.dataset.category = expense.category;
    pill.textContent = categoryLabel(expense.category);
    categoryTd.append(pill);

    const dateTd = document.createElement("td");
    dateTd.textContent = formatDate(expense.date);

    const actionsTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-danger";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = expense.id;
    deleteBtn.textContent = "Delete";
    actionsTd.append(deleteBtn);

    tr.append(nameTd, priceTd, categoryTd, dateTd, actionsTd);
    fragment.append(tr);
  }

  expensesBody.replaceChildren(fragment);
};

const init = () => {
  // load data from LS 
  const expenses = loadExpenses();
  // Render Top Report tiles 
  renderReport(expenses);
  // Render the Table 
  renderTable(expenses);
};

const parsePrice = (value) => {
  const price = Number(value);
  if (!Number.isFinite(price) || price <= 0) return null;
  return Math.round(price * 100) / 100;
};

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  clearFormError();

  const name = nameInput?.value.trim() ?? "";
  const price = parsePrice(priceInput?.value);
  const category = categorySelect?.value ?? "";

  if (!name) {
    showFormError("Please enter an expense name.");
    nameInput?.focus();
    return;
  }

  if (price === null) {
    showFormError("Please enter a price greater than zero.");
    priceInput?.focus();
    return;
  }

  if (!CATEGORIES.includes(category)) {
    showFormError("Please choose a valid category.");
    categorySelect?.focus();
    return;
  }

  const expenses = loadExpenses();
  expenses.push({
    id: createId(),
    name,
    price,
    category,
    date: todayIso(),
    createdAt: Date.now(),
  });
  saveExpenses(expenses);
  form.reset();
  nameInput?.focus();
  render();
});

expensesBody?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const button = target.closest("[data-action='delete']");
  if (!(button instanceof HTMLElement)) return;

  const { id } = button.dataset;
  if (!id) return;

  const expenses = loadExpenses().filter((expense) => expense.id !== id);
  saveExpenses(expenses);
  init();
});

init();
