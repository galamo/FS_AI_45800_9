import assert from "node:assert/strict";
import test from "node:test";
import { loadProductCatalog } from "./catalog.js";
import { filterProducts, listFilterOptions } from "./filterProducts.js";
import { parseProductQuery } from "./parseProductQuery.js";

const products = await loadProductCatalog();

test("no filters returns the full catalog", () => {
  const matched = filterProducts(products, {});
  assert.equal(matched.length, products.length);
  assert.ok(matched.length >= 12);
});

test("search is case-insensitive and matches a description", () => {
  const parsed = parseProductQuery({ search: "  WIRELESS  " });
  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  const ids = filterProducts(products, parsed.filters).map((product) => product.id);
  assert.deepEqual(ids, ["neb-earbuds", "har-radio"]);
});

test("category, brand, price, and availability filters work together", () => {
  const parsed = parseProductQuery({
    category: "Audio",
    brand: "Northbeam",
    minPrice: "20",
    maxPrice: "150",
    inStock: "true",
  });
  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  const ids = filterProducts(products, parsed.filters).map((product) => product.id);
  assert.deepEqual(ids, ["neb-earbuds", "neb-headphones"]);
});

test("price boundaries are inclusive and minPrice 0 is valid", () => {
  const zero = parseProductQuery({ minPrice: "0", maxPrice: "0" });
  assert.equal(zero.ok, true);
  if (!zero.ok) {
    return;
  }

  assert.deepEqual(
    filterProducts(products, zero.filters).map((product) => product.id),
    ["lum-swatch"],
  );

  const upper = parseProductQuery({ minPrice: "150", maxPrice: "150" });
  assert.equal(upper.ok, true);
  if (!upper.ok) {
    return;
  }

  assert.deepEqual(
    filterProducts(products, upper.filters).map((product) => product.id),
    ["neb-headphones"],
  );
});

test("inStock false returns only unavailable products", () => {
  const parsed = parseProductQuery({ inStock: "false" });
  assert.equal(parsed.ok, true);
  if (!parsed.ok) {
    return;
  }

  const matched = filterProducts(products, parsed.filters);
  assert.ok(matched.length > 0);
  assert.ok(matched.every((product) => product.inStock === false));
});

test("invalid prices and availability return a query error", () => {
  assert.equal(parseProductQuery({ minPrice: "-1" }).ok, false);
  assert.equal(parseProductQuery({ maxPrice: "abc" }).ok, false);
  assert.equal(parseProductQuery({ minPrice: "80", maxPrice: "10" }).ok, false);
  assert.equal(parseProductQuery({ inStock: "yes" }).ok, false);
  assert.equal(parseProductQuery({ search: "   ", minPrice: "" }).ok, true);
});

test("filter options come from the full dataset and are sorted", () => {
  const options = listFilterOptions(products);
  assert.deepEqual(options.categories, ["Accessories", "Audio", "Home"]);
  assert.deepEqual(options.brands, ["Harbor & Co", "Lumen", "Northbeam"]);
});
