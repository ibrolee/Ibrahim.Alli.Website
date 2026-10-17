import { describe, expect, test } from "bun:test";
import { comboBottleCost, restoreBottleLife, savedFinishDate, setBottleFinished, setComboBottleFinished, shelfTotals } from "./scent-shelf";

describe("bottle purchase history", () => {
  const first = { id: "bottle:1", amount: 30000, currency: "NGN" as const, added: "2026-10-17" };
  test("finishing and buying again retain the original spend and separate bottles", () => {
    const finished = setBottleFinished([first], first.id, "2026-11-17T12:00:00.000Z");
    expect(shelfTotals(finished, [])).toEqual({ onShelf: 0, finished: 1, shelfCost: 0, totalSpent: 30000 });
    const rebought = [{ ...first, id: "bottle:2", amount: 35000 }, ...finished];
    expect(shelfTotals(rebought, [])).toEqual({ onShelf: 1, finished: 1, shelfCost: 35000, totalSpent: 65000 });
    expect("finishedAt" in first).toBe(false);
    expect(shelfTotals(setBottleFinished(rebought, "bottle:1"), []).onShelf).toBe(2);
  });
  test("older bottles default to on shelf and dollar prices are never added to naira", () => {
    expect(shelfTotals([first, { ...first, id: "bottle:usd", currency: "USD", amount: 50 }], [])).toEqual({ onShelf: 2, finished: 0, shelfCost: 30000, totalSpent: 30000 });
    expect(savedFinishDate(undefined)).toBeUndefined();
    expect(savedFinishDate("bad date")).toBeUndefined();
    expect(savedFinishDate("2026-10-17")).toBe("2026-10-17T00:00:00.000Z");
  });
  test("backup round trip keeps purchases and finish dates", () => {
    const data = setBottleFinished([first], first.id, "2026-11-17T12:00:00.000Z");
    expect(shelfTotals(JSON.parse(JSON.stringify(data)), [])).toEqual(shelfTotals(data, []));
  });
  test("old backups acquire stable bottle identities while finished purchases keep their identity", () => {
    const old = { perfume: { id: "db:123" } };
    expect(restoreBottleLife(old, 0)).toEqual({ id: "bottle:legacy:0:db:123" });
    expect(restoreBottleLife(old, 1).id).not.toBe(restoreBottleLife(old, 0).id);
    expect(restoreBottleLife({ ...old, id: "bottle:repurchase", finishedAt: "2026-10-17" }, 0)).toEqual({ id: "bottle:repurchase", finishedAt: "2026-10-17T00:00:00.000Z" });
  });
});

describe("combo lifecycle", () => {
  const combo = { target: "collection" as const, amount: 100, perfumes: [{ id: "a" }, { id: "b" }, { id: "c" }] };
  test("partly finished combos retain the full purchase but only active bottle shares stay on shelf", () => {
    const partial = setComboBottleFinished(combo, "a", "2026-10-17");
    expect(shelfTotals([], [partial])).toEqual({ onShelf: 2, finished: 1, shelfCost: 66.66, totalSpent: 100 });
    const done = setComboBottleFinished(setComboBottleFinished(partial, "b", "2026-10-18"), "c", "2026-10-19");
    expect(shelfTotals([], [done])).toEqual({ onShelf: 0, finished: 3, shelfCost: 0, totalSpent: 100 });
    expect(shelfTotals([], [setComboBottleFinished(done, "a")]).shelfCost).toBe(33.34);
  });
  test("allocation handles rounding and never counts wishlist bundles", () => {
    expect(combo.perfumes.reduce((sum, _, i) => sum + comboBottleCost(combo, i), 0)).toBe(100);
    expect(shelfTotals([], [{ ...combo, target: "wishlist" }])).toEqual({ onShelf: 0, finished: 0, shelfCost: 0, totalSpent: 0 });
    expect(setComboBottleFinished(combo, "unknown", "2026-10-17")).toBe(combo);
  });
});
