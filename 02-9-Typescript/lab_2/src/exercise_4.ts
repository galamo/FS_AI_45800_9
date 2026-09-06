interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description?: string;
}

const products: Product[] = [
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
