"use client";

import { useState } from "react";
import { company } from "@/lib/data";

export default function QuoteDialog({
  label = "בקשת הצעת מחיר",
  productName,
  variant = "primary",
  className = "",
}: {
  label?: string;
  productName?: string;
  variant?: "primary" | "light" | "ghost";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const buttonClass =
    variant === "light" ? "btn btn-light" : variant === "ghost" ? "btn btn-ghost" : "btn btn-primary";

  return (
    <>
      <button
        type="button"
        className={`${buttonClass} ${className}`}
        onClick={() => {
          setSent(false);
          setOpen(true);
        }}
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-3 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="בקשת הצעת מחיר"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">בקשת הצעת מחיר</h2>
                <p className="mt-1 text-[13px] text-slate-500">
                  {productName
                    ? `מוצר: ${productName}`
                    : "ספרו לנו מה צריך — נחזור עם הצעה מסודרת."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="סגירה"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {sent ? (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                <div className="text-base font-bold text-emerald-800">הבקשה נקלטה (דמו)</div>
                <p className="mt-1 text-sm leading-relaxed text-emerald-700">
                  בגרסה החיה הבקשה נשלחת למייל המכירות ונשמרת במערכת. לסגירה מהירה אפשר לפנות ישירות
                  לאחד מאנשי המכירות.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {company.sales.map((person) => (
                    <a
                      key={person.phone}
                      href={person.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary text-[13px]"
                    >
                      {person.name} · {person.phone}
                    </a>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn btn-ghost mt-2 text-[13px]"
                >
                  סגירה
                </button>
              </div>
            ) : (
              <form
                className="mt-5 space-y-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-semibold text-slate-600">שם מלא</span>
                    <input required className="field" placeholder="שם איש קשר" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-semibold text-slate-600">טלפון</span>
                    <input required type="tel" className="field num" dir="ltr" placeholder="050-0000000" />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-semibold text-slate-600">
                      חברה / אתר
                    </span>
                    <input className="field" placeholder="לא חובה" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-semibold text-slate-600">כמות</span>
                    <input
                      type="number"
                      min={1}
                      defaultValue={1}
                      className="field num"
                      dir="ltr"
                      aria-label="כמות"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold text-slate-600">
                    מידה / דגם מבוקש
                  </span>
                  <input
                    className="field"
                    defaultValue={productName ?? ""}
                    placeholder="למשל: מכולת אשפתון 150 ס״מ"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold text-slate-600">הערות</span>
                  <textarea
                    rows={3}
                    className="field"
                    placeholder="סוג הפסולת, אתר הפרויקט, מועד אספקה, האם נדרשת הובלה…"
                  />
                </label>

                <button type="submit" className="btn btn-primary w-full">
                  שליחת בקשה
                </button>
                <p className="text-center text-[11px] leading-relaxed text-slate-500">
                  הדמו לא שולח נתונים. בגרסה החיה נדרשת הסכמה למדיניות הפרטיות. אפשר גם להתקשר:{" "}
                  <a href={company.phoneHref} className="num whitespace-nowrap font-semibold text-slate-700" dir="ltr">
                    {company.phone}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
