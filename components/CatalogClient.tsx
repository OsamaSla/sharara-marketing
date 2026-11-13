"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { cheapestSize, groups } from "@/lib/data";
import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";

const sortOptions = [
  { value: "name", label: "לפי שם" },
  { value: "price", label: "לפי מחיר" },
  { value: "sizes", label: "לפי מספר מידות" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

export default function CatalogClient() {
  const { products } = useStore();
  const params = useSearchParams();
  const urlGroup = params.get("group") ?? "all";
  const [group, setGroup] = useState(urlGroup);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortValue>("name");

  useEffect(() => {
    setGroup(urlGroup);
  }, [urlGroup]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = products
      .filter((product) => product.status === "published")
      .filter((product) => group === "all" || product.group === group)
      .filter((product) => {
        if (!term) return true;
        return (
          product.name.toLowerCase().includes(term) ||
          product.subtitle.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
        );
      });

    return list.sort((a, b) => {
      if (sort === "sizes") return b.sizes.length - a.sizes.length;
      if (sort === "price") {
        const minA = cheapestSize(a)?.priceNetAgorot ?? Infinity;
        const minB = cheapestSize(b)?.priceNetAgorot ?? Infinity;
        return minA - minB;
      }
      return a.name.localeCompare(b.name, "he");
    });
  }, [products, group, query, sort]);

  const chips = [{ slug: "all", name: "הכל" }, ...groups];
  const sections = groups
    .map((item) => ({ group: item, items: visible.filter((product) => product.group === item.slug) }))
    .filter((section) => section.items.length > 0);

  return (
    <div>
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => {
              const active = group === chip.slug;
              return (
                <button
                  key={chip.slug}
                  type="button"
                  onClick={() => setGroup(chip.slug)}
                  aria-pressed={active}
                  className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition ${
                    active
                      ? "bg-brand-500 text-night shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {chip.name}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative block">
              <span className="sr-only">חיפוש מוצר</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="חיפוש מוצר"
                className="field w-full pe-9 sm:w-56"
              />
              <svg
                className="pointer-events-none absolute top-1/2 end-3 -translate-y-1/2 text-slate-500"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </label>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortValue)}
              className="field w-full sm:w-40"
              aria-label="מיון"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <h2 className="sr-only">רשימת מוצרים</h2>

      <div className="mt-5 flex items-center justify-between text-[12.5px] text-slate-600">
        <span>
          <b className="text-slate-800">{visible.length}</b> מוצרים
        </span>
        <span className="hidden sm:block">לחיצה על מוצר מציגה מידות, מחירון או מחשבון הערכה</span>
      </div>

      {visible.length === 0 ? (
        <div className="card mt-4 p-10 text-center">
          <p className="font-semibold text-slate-700">לא נמצאו מוצרים</p>
          <p className="mt-1 text-sm text-slate-600">נסו חיפוש אחר או בחרו קבוצה אחרת.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-8">
          {sections.map((section) => (
            <section key={section.group.slug} aria-labelledby={`group-${section.group.slug}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2
                  id={`group-${section.group.slug}`}
                  className="text-[15px] font-extrabold text-slate-900"
                >
                  {section.group.name}
                </h2>
                <span className="text-[11.5px] text-slate-600">{section.group.blurb}</span>
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
