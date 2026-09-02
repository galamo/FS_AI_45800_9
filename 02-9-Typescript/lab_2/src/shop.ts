
function formatProductId(id:number):string {
  return `sku_${id}`;
}

function isAdult(age:number):boolean {
  return age >= 18;
}

function calcSubtotal(unitPrice:number, quantity:number):number {
  return unitPrice * quantity;
}

function applyMemberDiscount(subtotal:number, isMember:boolean):number {
  if (isMember) {
    return subtotal * 0.9;
  }
  return subtotal;
}

function buildReceiptLine(productName:string, quantity:number, paid:boolean):string {
  if (paid) {
    return `${productName} x${quantity} — paid`;
  }
  return `${productName} x${quantity} — pending`;
}

function getWelcomeMessage(customerName:string, isMember:boolean):string {
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
console.log(hello);
console.log(hello);
console.log(hello);
console.log(hello);
console.log(hello);
console.log(hello);
console.log(hello);
console.log(hello);
console.log(hello);
console.log(hello);
console.log(hello);
