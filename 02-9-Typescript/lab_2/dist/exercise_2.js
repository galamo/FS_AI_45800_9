"use strict";
function add(a, b) {
    console.log(a);
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    else if (typeof a === "string" && typeof b === "string") {
        return Number(a) + Number(b);
    }
    else {
        return "Invalid Input";
    }
}
const result = add(5, 3);
const result2 = add("4", "1");
