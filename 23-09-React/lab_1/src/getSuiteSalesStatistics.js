const roundMoney = (value) => Math.round(value * 100) / 100;

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim() !== "";

const isSuiteSale = (sale) => {
  if (sale === null || typeof sale !== "object") {
    return false;
  }

  const { name, price, color, brand } = sale;

  return (
    isNonEmptyString(name) &&
    typeof price === "number" &&
    Number.isFinite(price) &&
    price >= 0 &&
    isNonEmptyString(color) &&
    isNonEmptyString(brand)
  );
};

const emptyGroup = (keyName, key) => ({
  [keyName]: key,
  count: 0,
  revenue: 0,
});

const addToGroup = (groups, keyName, key, price) => {
  const current = groups.get(key) ?? emptyGroup(keyName, key);
  current.count += 1;
  current.revenue = roundMoney(current.revenue + price);
  groups.set(key, current);
};

const finalizeGroups = (groups, totalRevenue) =>
  [...groups.values()]
    .map((group) => ({
      ...group,
      averagePrice: roundMoney(group.revenue / group.count),
      revenueShare:
        totalRevenue === 0 ? 0 : roundMoney(group.revenue / totalRevenue),
    }))
    .sort((left, right) => right.revenue - left.revenue || right.count - left.count);

const leadingGroup = (groups) => groups[0] ?? null;

const copySale = ({ name, price, color, brand }) => ({
  name,
  price,
  color,
  brand,
});

/**
 * @typedef {Object} SuiteSale
 * @property {string} name
 * @property {number} price
 * @property {string} color
 * @property {string} brand
 */

/**
 * Summarize an array of suite sales.
 * @param {SuiteSale[]} sales
 */
export const getSuiteSalesStatistics = (sales) => {
  if (!Array.isArray(sales)) {
    throw new TypeError("sales must be an array");
  }

  for (const [index, sale] of sales.entries()) {
    if (!isSuiteSale(sale)) {
      throw new TypeError(
        `sale at index ${index} must include a name, a non-negative price, a color, and a brand`,
      );
    }
  }

  if (sales.length === 0) {
    return {
      count: 0,
      totalRevenue: 0,
      averagePrice: 0,
      lowestPrice: null,
      highestPrice: null,
      cheapest: null,
      mostExpensive: null,
      byBrand: [],
      byColor: [],
      topBrand: null,
      topColor: null,
    };
  }

  let totalRevenue = 0;
  let cheapest = sales[0];
  let mostExpensive = sales[0];
  const brands = new Map();
  const colors = new Map();

  for (const sale of sales) {
    const { price, brand, color } = sale;
    totalRevenue += price;

    if (price < cheapest.price) {
      cheapest = sale;
    }

    if (price > mostExpensive.price) {
      mostExpensive = sale;
    }

    addToGroup(brands, "brand", brand, price);
    addToGroup(colors, "color", color, price);
  }

  const roundedRevenue = roundMoney(totalRevenue);
  const byBrand = finalizeGroups(brands, roundedRevenue);
  const byColor = finalizeGroups(colors, roundedRevenue);

  return {
    count: sales.length,
    totalRevenue: roundedRevenue,
    averagePrice: roundMoney(totalRevenue / sales.length),
    lowestPrice: cheapest.price,
    highestPrice: mostExpensive.price,
    cheapest: copySale(cheapest),
    mostExpensive: copySale(mostExpensive),
    byBrand,
    byColor,
    topBrand: leadingGroup(byBrand),
    topColor: leadingGroup(byColor),
  };
};
