import { roundShekel } from "./pricing";
import type { CalcConfig, CalcRate, CalcType } from "./types";

/** Steel density: kg per m² per mm of thickness. */
const STEEL_DENSITY = 7.85;

export type CalcInput = {
  /** spiral duct diameter, mm */
  diameterMm: number;
  /** rectangular duct width, mm */
  widthMm: number;
  /** rectangular duct height, mm */
  heightMm: number;
  lengthM: number;
  thicknessMm: number;
};

export type CalcResult = {
  areaSqm: number;
  weightKg: number;
  rateNetPerSqm: number;
  lowNetAgorot: number;
  highNetAgorot: number;
};

export const emptyCalcInput: CalcInput = {
  diameterMm: 300,
  widthMm: 600,
  heightMm: 400,
  lengthM: 3,
  thicknessMm: 0.7,
};

/** Developed sheet area of the duct, in m². */
export function sheetAreaSqm(type: CalcType, input: CalcInput): number {
  const { diameterMm, widthMm, heightMm, lengthM } = input;
  if (type === "spiral") {
    if (diameterMm <= 0 || lengthM <= 0) return 0;
    return Math.PI * (diameterMm / 1000) * lengthM;
  }
  if (widthMm <= 0 || heightMm <= 0 || lengthM <= 0) return 0;
  return 2 * ((widthMm + heightMm) / 1000) * lengthM;
}

export function rateFor(rates: CalcRate[], thicknessMm: number): CalcRate | undefined {
  return rates.find((rate) => rate.thicknessMm === thicknessMm);
}

/**
 * Rough price range for a run of duct. Not a quote: the shop prices from the
 * drawing (fittings, flanges, access doors and installation are extra).
 */
export function estimate(
  calc: CalcConfig,
  rates: CalcRate[],
  input: CalcInput,
): (CalcResult & { underMinCharge: boolean }) | null {
  const areaSqm = sheetAreaSqm(calc.type, input);
  const rate = rateFor(rates, input.thicknessMm);
  if (areaSqm <= 0 || !rate) return null;

  const raw = areaSqm * rate.rateNetPerSqm * calc.rateFactor;
  const charged = Math.max(raw, calc.minChargeNetAgorot);
  const spread = calc.spreadPercent / 100;

  return {
    areaSqm,
    weightKg: areaSqm * input.thicknessMm * STEEL_DENSITY,
    rateNetPerSqm: rate.rateNetPerSqm,
    lowNetAgorot: roundShekel(charged * (1 - spread)),
    highNetAgorot: roundShekel(charged * (1 + spread)),
    underMinCharge: raw < calc.minChargeNetAgorot,
  };
}
