export type BottleLife = { id: string; amount: number; currency: "NGN" | "USD"; added: string; finishedAt?: string };
export type ComboLife = { target: "collection" | "wishlist"; amount?: number; perfumes: { id: string }[]; finishedPerfumes?: Record<string, string> };

export function savedFinishDate(value: unknown): string | undefined {
  return typeof value === "string" && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : undefined;
}

export function restoreBottleLife(record: { id?: unknown; perfume: { id: string }; finishedAt?: unknown }, index: number) {
  const date = savedFinishDate(record.finishedAt);
  return {
    id: typeof record.id === "string" && record.id.startsWith("bottle:") ? record.id : "bottle:legacy:" + index + ":" + record.perfume.id,
    ...(date ? { finishedAt: date } : {}),
  };
}

// Allocate the original bundle price once, in whole kobo; the shares sum to its exact price.
export function comboBottleCost(combo: ComboLife, index: number): number {
  const count = combo.perfumes.length;
  if (!count || index < 0 || index >= count) return 0;
  const kobo = Math.round((combo.amount || 0) * 100);
  return (Math.floor(kobo / count) + (index < kobo % count ? 1 : 0)) / 100;
}

export function setBottleFinished<T extends BottleLife>(bottles: T[], bottleId: string, date?: string): T[] {
  return bottles.map(bottle => bottle.id === bottleId ? { ...bottle, finishedAt: date } : bottle);
}

export function setComboBottleFinished<T extends ComboLife>(combo: T, perfumeId: string, date?: string): T {
  if (!combo.perfumes.some(p => p.id === perfumeId)) return combo;
  const finishedPerfumes = { ...combo.finishedPerfumes };
  if (date) finishedPerfumes[perfumeId] = date;
  else delete finishedPerfumes[perfumeId];
  return { ...combo, finishedPerfumes };
}

export function shelfTotals(bottles: BottleLife[], combos: ComboLife[]) {
  let onShelf = 0, finished = 0, shelfCost = 0, totalSpent = 0;
  for (const bottle of bottles) {
    if (bottle.finishedAt) finished++; else onShelf++;
    if (bottle.currency === "NGN") {
      totalSpent += bottle.amount;
      if (!bottle.finishedAt) shelfCost += bottle.amount;
    }
  }
  for (const combo of combos.filter(c => c.target === "collection")) {
    totalSpent += combo.amount || 0;
    combo.perfumes.forEach((p, index) => {
      if (combo.finishedPerfumes?.[p.id]) finished++;
      else { onShelf++; shelfCost += comboBottleCost(combo, index); }
    });
  }
  return { onShelf, finished, shelfCost: Math.round(shelfCost * 100) / 100, totalSpent: Math.round(totalSpent * 100) / 100 };
}
