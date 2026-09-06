function add(a: number, b: number): number;
function add(a: string, b: string): number;
function add(a: number | string, b: number | string ): number | string {
  console.log(a);
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else if (typeof a === "string" && typeof b === "string") {
    return Number(a) + Number(b);
  } else {
    return "Invalid Input";
  }
}

const result = add(5, 3);
const result2 = add("4","1")


