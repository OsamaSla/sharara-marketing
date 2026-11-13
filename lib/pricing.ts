import { VAT_RATE, type PriceMode, type Size } from "./types";

/** Prices are stored net, ex-VAT, as integers in agorot (1/100 ₪). */
export function withVat(netAgorot: number): number {
  return roundShekel(netAgorot * (1 + VAT_RATE));
}

export function roundShekel(agorot: number): number {
  return Math.round(agorot / 100) * 100;
}

/** null means "price on request" (e.g. contractor price per order). */
export function priceFor(size: Size, mode: PriceMode): number | null {
  if (mode === "dealer") return size.dealerNetAgorot;
  if (mode === "net") return size.priceNetAgorot;
  return withVat(size.priceNetAgorot);
}

export function formatILS(agorot: number): string {
  const value = new Intl.NumberFormat("he-IL", { maximumFractionDigits: 0 }).format(
    Math.round(agorot / 100),
  );
  return `${value} ₪`;
}

export function formatNum(value: number, digits = 0): string {
  return new Intl.NumberFormat("he-IL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export const priceModeNote: Record<PriceMode, string> = {
  gross: "המחירים כוללים מע״מ 18% ואינם כוללים הובלה.",
  net: "המחירים ללא מע״מ, לצורכי השוואה.",
  dealer: "מחירי קבלן לפי כמויות — פנו להצעה.",
};

export const priceModeBadge: Record<PriceMode, string> = {
  gross: "כולל מע״מ",
  net: "ללא מע״מ",
  dealer: "מחיר קבלן",
};
