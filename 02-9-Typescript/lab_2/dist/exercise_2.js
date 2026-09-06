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
function convertUSDToILS(value) {
    if (typeof value === "number") {
        return value * 3;
    }
    else {
        return "Invalid Input";
    }
}
function getUserId(id) {
    if (typeof id === "number") {
        return "gal amouyal";
    }
    else {
        return "gal amouyal";
    }
}
const result7 = getUserId(1);
const result8 = getUserId("vadim");
