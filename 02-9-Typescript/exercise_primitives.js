function getTicketId(eventId) {
  return `ticket_${eventId}`;
}

function calcSubtotal(unitPrice, quantity) {
  return unitPrice * quantity;
}

function applyDiscount(subtotal, percent) {
  const factor = 1 - percent / 100;
  return subtotal * factor;
}

function isFreeShipping(subtotal, isMember) {
  return isMember || subtotal >= 50;
}

function formatReceipt(customerName, total, shipped) {
  const status = shipped ? "shipped" : "pending";
  return `${customerName} — ${total.toFixed(2)} (${status})`;
}

const eventId = 42;
const unitPrice = 19.9;
const quantity = 3;
const discountPercent = 10;
const isMember = true;
const customerName = "Maya";

const ticketId = getTicketId(eventId);
const subtotal = calcSubtotal(unitPrice, quantity);
const total = applyDiscount(subtotal, discountPercent);
const shipped = isFreeShipping(total, isMember);
const receipt = formatReceipt(customerName, total, shipped);

console.log(ticketId);
console.log(receipt);
