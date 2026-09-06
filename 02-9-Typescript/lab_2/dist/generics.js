"use strict";
function getIdentity(value) {
    return value;
}
function getLastItemFromArray(array) {
    return array[array.length - 1];
}
const resultarr = getLastItemFromArray([1, 2, 3, 4, 5]);
const resultarr1 = getLastItemFromArray(["red", "green", "blue", "yellow"]);
function getLastItemFromArrayGen(array) {
    return array[array.length - 1];
}
const resultarr2 = getLastItemFromArrayGen([1, 2, 3, 4, 5]);
const resultarr3 = getLastItemFromArrayGen(["red", "green", "blue", "yellow"]);
function getCars() {
    return {
        data: undefined,
        isSuccess: false,
        message: "Failure",
        errorMessage: "Something went Wrong"
    };
}
function getBooks() {
    return {
        data: { id: 1, title: "The Great Gatsby" },
        isSuccess: true,
        message: "Success"
    };
}
function getCompanies() {
    return {
        data: { id: 1, name: "Google" },
        isSuccess: true,
        message: "Success"
    };
}
function getShapes() {
    return {
        data: { id: 1, type: "Circle" },
        isSuccess: true,
        message: "Success"
    };
}
