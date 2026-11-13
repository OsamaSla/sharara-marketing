"use client";

import { useMemo, useState } from "react";
import { emptyCalcInput, estimate } from "@/lib/calc";
import { usePriceMode } from "@/lib/price-mode";
import { formatILS, formatNum, priceModeBadge, withVat } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/types";
import PriceToggle from "./PriceToggle";

const spiralDiameters = [100, 125, 150, 200, 250, 300, 350, 400, 500, 600, 800, 1000, 1200, 1500];

function NumberField({
  id,
  label,
  suffix,
  value,
  onChange,
  min,
  max,
  step,
}: {
  id: string;
  label: string;
  suffix: string;
  value: string;
  onChange: (next: string) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-[12px] font-semibold text-slate-700">{label}</span>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          dir="ltr"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(event.target.value)}
          className="field num pe-12 text-start"
        />
        <span className="pointer-events-none absolute top-1/2 end-3 -translate-y-1/2 text-[11.5px] text-slate-500">
          {suffix}
        </span>
      </div>
    </label>
  );
}

export default function PriceCalculator({ product }: { product: Product }) {
  const { settings } = useStore();
  const { mode } = usePriceMode();
  const calc = product.calc;

  const [diameter, setDiameter] = useState("300");
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("400");
  const [length, setLength] = useState("3");
  const [thickness, setThickness] = useState("0.7");

  const result = useMemo(() => {
    if (!calc) return null;
    const input = {
      ...emptyCalcInput,
      diameterMm: Number(diameter),
      widthMm: Number(width),
      heightMm: Number(height),
      lengthM: Number(length),
      thicknessMm: Number(thickness),
    };
    return estimate(calc, settings.calcRates, input);
  }, [calc, settings.calcRates, diameter, width, height, length, thickness]);

  if (!calc) return null;

  const isSpiral = calc.type === "spiral";
  const price = (netAgorot: number) => (mode === "gross" ? withVat(netAgorot) : netAgorot);

  return (
    <section className="card overflow-hidden" aria-labelledby="calc-title">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 p-4 sm:p-5">
        <div>
          <h2 id="calc-title" className="text-base font-extrabold text-slate-900">
            מחשבון הערכת מחיר
          </h2>
          <p className="mt-1 text-[12px] text-slate-500">
            {isSpiral ? "הערכה לפי קוטר, אורך ועובי פח" : "הערכה לפי רוחב, גובה, אורך ועובי פח"}
          </p>
        </div>
        <div className="no-print">
          <PriceToggle />
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1.05fr_1fr]">
        <fieldset>
          <legend className="sr-only">מידות התעלה</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {isSpiral ? (
              <>
                <label htmlFor="calc-diameter" className="block sm:col-span-2">
                  <span className="mb-1 block text-[12px] font-semibold text-slate-700">קוטר</span>
                  <select
                    id="calc-diameter"
                    value={diameter}
                    onChange={(event) => setDiameter(event.target.value)}
                    className="field num"
                  >
                    {spiralDiameters.map((option) => (
                      <option key={option} value={option}>
                        {formatNum(option)} מ״מ
                      </option>
                    ))}
                  </select>
                </label>
              </>
            ) : (
              <>
                <NumberField
                  id="calc-width"
                  label="רוחב"
                  suffix="מ״מ"
                  value={width}
                  onChange={setWidth}
                  min={100}
                  max={2500}
                  step={50}
                />
                <NumberField
                  id="calc-height"
                  label="גובה"
                  suffix="מ״מ"
                  value={height}
                  onChange={setHeight}
                  min={100}
                  max={2500}
                  step={50}
                />
              </>
            )}

            <NumberField
              id="calc-length"
              label="אורך תעלה"
              suffix="מטר"
              value={length}
              onChange={setLength}
              min={0.5}
              max={100}
              step={0.5}
            />

            <label htmlFor="calc-thickness" className="block">
              <span className="mb-1 block text-[12px] font-semibold text-slate-700">עובי פח</span>
              <select
                id="calc-thickness"
                value={thickness}
                onChange={(event) => setThickness(event.target.value)}
                className="field num"
              >
                {settings.calcRates.map((rate) => (
                  <option key={rate.thicknessMm} value={rate.thicknessMm}>
                    {rate.thicknessMm} מ״מ
                  </option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {result ? (
            <>
              <div className="text-[11.5px] font-semibold text-slate-600">
                {isSpiral ? "הערכת מחיר לתעלה" : "הערכת מחיר לתעלה"} · {priceModeBadge[mode]}
              </div>
              {mode === "dealer" ? (
                <div className="mt-1 text-xl font-extrabold text-slate-900">לפי הצעה</div>
              ) : (
                <div className="num mt-1 text-[22px] font-extrabold leading-tight text-slate-900">
                  <bdi dir="ltr">
                    {formatILS(price(result.lowNetAgorot))}–{formatILS(price(result.highNetAgorot))}
                  </bdi>
                </div>
              )}

              <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-200 pt-3 text-center">
                <div>
                  <dt className="text-[10.5px] text-slate-600">שטח פח</dt>
                  <dd className="num text-[13px] font-bold text-slate-900">
                    {formatNum(result.areaSqm, 2)} מ״ר
                  </dd>
                </div>
                <div>
                  <dt className="text-[10.5px] text-slate-600">משקל</dt>
                  <dd className="num text-[13px] font-bold text-slate-900">
                    {formatNum(result.weightKg, 1)} ק״ג
                  </dd>
                </div>
                <div>
                  <dt className="text-[10.5px] text-slate-600">תעריף פח</dt>
                  <dd className="num text-[13px] font-bold text-slate-900">
                    {formatILS(result.rateNetPerSqm)}
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-[11.5px] leading-relaxed text-slate-600">
                {result.underMinCharge
                  ? "בהזמנה קטנה מהמינימום תחויב כמות מינימלית. "
                  : ""}
                הערכה בלבד — מרפקים, הסתעפויות, אוגנים, בידוד והתקנה מתומחרים בנפרד לפי שרטוט.
              </p>
            </>
          ) : (
            <p className="text-[13px] font-semibold text-slate-600">
              הזינו מידות תקינות כדי לקבל הערכה.
            </p>
          )}

          <a
            href={`https://wa.me/972535819466?text=${encodeURIComponent(
              `שלום, אשמח להצעת מחיר ל${product.name}.`,
            )}`}
            className="btn btn-primary mt-4 w-full text-[13px]"
          >
            שליחת המידות בוואטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}
