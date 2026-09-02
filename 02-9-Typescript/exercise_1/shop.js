function formatProductId(id) {
  return `sku_${id}`;
}

function isAdult(age) {
  return age >= 18;
}

function calcSubtotal(unitPrice, quantity) {
  return unitPrice * quantity;
}

function applyMemberDiscount(subtotal, isMember) {
  if (isMember) {
    return subtotal * 0.9;
  }
  return subtotal;
}

function buildReceiptLine(productName, quantity, paid) {
  if (paid) {
    return `${productName} x${quantity} — paid`;
  }
  return `${productName} x${quantity} — pending`;
}

function getWelcomeMessage(customerName, isMember) {
  if (isMember) {
    return `Welcome back, ${customerName}`;
  }
  return `Hello, ${customerName}`;
}

const productId = formatProductId(1042);
const adult = isAdult(21);
const subtotal = calcSubtotal(20, 3);
const total = applyMemberDiscount(subtotal, true);
const line = buildReceiptLine("Notebook", 3, true);
const hello = getWelcomeMessage("Aviv", true);

console.log(productId);
console.log(adult);
console.log(subtotal);
console.log(total);
console.log(line);
console.log(hello);
