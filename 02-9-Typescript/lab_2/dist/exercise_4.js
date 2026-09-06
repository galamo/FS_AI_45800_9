"use strict";
const products = [
    {
        id: 1,
        name: "Notebook",
        price: 19.9,
        category: "Stationery",
        inStock: true,
    },
    {
        id: 2,
        name: "Pen",
        price: 2.5,
        category: "Stationery",
        inStock: false,
    },
    {
        id: 3,
        name: "Laptop",
        price: 999,
        category: "Electronics",
        inStock: true,
        description: "15-inch laptop",
    },
];
const availableProducts = products.filter((product) => product.inStock);
console.log(availableProducts);
