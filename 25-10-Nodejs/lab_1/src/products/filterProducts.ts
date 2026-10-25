import type { Product, ProductFilters } from "./product.js";

export function filterProducts(products: readonly Product[], filters: ProductFilters): Product[] {
  const search = filters.search?.toLowerCase();

  return products.filter((product) => {
    if (search) {
      const nameMatches = product.name.toLowerCase().includes(search);
      const descriptionMatches = product.description.toLowerCase().includes(search);
      if (!nameMatches && !descriptionMatches) {
        return false;
      }
    }

    if (filters.category !== undefined && product.category !== filters.category) {
      return false;
    }

    if (filters.brand !== undefined && product.brand !== filters.brand) {
      return false;
    }

    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }

    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false;
    }

    return true;
  });
}

export function listFilterOptions(products: readonly Product[]) {
  const categories = [...new Set(products.map((product) => product.category))].sort((left, right) =>
    left.localeCompare(right),
  );
  const brands = [...new Set(products.map((product) => product.brand))].sort((left, right) =>
    left.localeCompare(right),
  );

  const currencies = [...new Set(products.map((product) => product.currency))].sort((left, right) =>
    left.localeCompare(right),
  );

  return { categories, brands, currencies };
}
