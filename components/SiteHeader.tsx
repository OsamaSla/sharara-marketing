"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { company } from "@/lib/data";
import PriceToggle from "./PriceToggle";

const links = [
  { href: "/products/ashpaon", label: "מכולות אשפתון" },
  { href: "/products?group=tin", label: "תעשיות פח" },
  { href: "/products?group=hvac", label: "מיזוג ואוורור" },
  { href: "/products", label: "כל המוצרים" },
  { href: "/#contact", label: "צור קשר" },
];

function LogoMark() {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt=""
      width={65}
      height={92}
      priority
      className="h-11 w-auto shrink-0"
    />
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="bg-night text-[12px] text-white/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5">
          <div className="flex items-center gap-3">
            <a href={company.phoneHref} className="num font-semibold text-white hover:text-brand-200">
              {company.phone}
            </a>
            <span className="hidden text-white/30 sm:inline">|</span>
            <span className="hidden sm:inline">{company.tagline}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={company.sales[0].whatsapp}
              className="hidden text-white/70 transition hover:text-white md:inline"
            >
              וואטסאפ למכירות
            </a>
            <Link
              href="/admin"
              className="rounded-full bg-white/10 px-3 py-0.5 font-medium transition hover:bg-white/20"
            >
              כניסת עורכים
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold text-slate-900">{company.name}</span>
            <span className="block text-[11px] text-slate-500">{company.short}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand-700">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <PriceToggle compact />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="פתיחת תפריט"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 transition hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
            <PriceToggle />
            <a href={company.phoneHref} className="btn btn-primary num text-[13px]">
              {company.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
