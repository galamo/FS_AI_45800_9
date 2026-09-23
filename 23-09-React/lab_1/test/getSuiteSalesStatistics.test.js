import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSuiteSalesStatistics } from "../index.js";

const sales = [
  { name: "Linen Weekender", price: 420, color: "sand", brand: "Aviary" },
  { name: "Midnight Tailored", price: 890, color: "navy", brand: "Aviary" },
  { name: "Harbor Two-Piece", price: 640, color: "navy", brand: "Northline" },
  { name: "Clay Studio", price: 310, color: "sand", brand: "Northline" },
];

describe("getSuiteSalesStatistics", () => {
  it("summarizes revenue, price range, and brand and color groups", () => {
    const stats = getSuiteSalesStatistics(sales);

    assert.equal(stats.count, 4);
    assert.equal(stats.totalRevenue, 2260);
    assert.equal(stats.averagePrice, 565);
    assert.equal(stats.lowestPrice, 310);
    assert.equal(stats.highestPrice, 890);
    assert.deepEqual(stats.cheapest, sales[3]);
    assert.deepEqual(stats.mostExpensive, sales[1]);
    assert.deepEqual(
      stats.byBrand.map(({ brand, count, revenue }) => ({
        brand,
        count,
        revenue,
      })),
      [
        { brand: "Aviary", count: 2, revenue: 1310 },
        { brand: "Northline", count: 2, revenue: 950 },
      ],
    );
    assert.equal(stats.topBrand.brand, "Aviary");
    assert.equal(stats.byColor[0].color, "navy");
    assert.equal(stats.topColor.revenue, 1530);
  });

  it("returns an empty summary for no sales", () => {
    const stats = getSuiteSalesStatistics([]);

    assert.equal(stats.count, 0);
    assert.equal(stats.totalRevenue, 0);
    assert.equal(stats.averagePrice, 0);
    assert.equal(stats.cheapest, null);
    assert.equal(stats.topBrand, null);
    assert.deepEqual(stats.byColor, []);
  });

  it("rejects a sale that is missing required fields", () => {
    assert.throws(
      () => getSuiteSalesStatistics([{ name: "Solo", price: 10 }]),
      /index 0/,
    );
  });
});
