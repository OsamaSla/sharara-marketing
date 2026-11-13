import Image from "next/image";
import Link from "next/link";
import { company, groups } from "@/lib/data";
import { asset } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer id="contact" className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src={asset("/brand/logo.png")}
            alt={company.name}
            width={237}
            height={135}
            loading="eager"
            className="h-20 w-auto"
          />
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{company.tagline}.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            מפעל לייצור מתכת: מכולות אשפתון לפריקה עצמית, מערכות מיזוג אוויר ועבודות מתכת לפי
            הזמנה.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            {company.address}
            <br />
            <a
              href={company.phoneHref}
              className="num font-semibold text-slate-800 hover:text-brand-700"
            >
              {company.phone}
            </a>
          </p>
        </div>

        <div>
          <div className="text-sm font-bold text-slate-900">מוצרים</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {groups.map((group) => (
              <li key={group.slug}>
                <Link href={`/products?group=${group.slug}`} className="hover:text-brand-700">
                  {group.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products/plenum" className="hover:text-brand-700">
                פלינומים — מחירון
              </Link>
            </li>
            <li>
              <Link href="/products/spiral-duct" className="hover:text-brand-700">
                מחשבון צנרת ספירלית
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold text-slate-900">מידע</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/products/ashpaon" className="hover:text-brand-700">
                מחירון מכולות אשפתון
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-brand-700">
                כל הקטלוג
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-brand-700">
                אחריות ותנאי רכישה
              </a>
            </li>
            <li>
              <Link href="/admin" className="hover:text-brand-700">
                כניסת עורכים
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold text-slate-900">מכירות</div>
          <ul className="mt-3 space-y-2 text-sm">
            {company.sales.map((person) => (
              <li key={person.phone} className="flex items-center justify-between gap-2">
                <span className="text-slate-600">{person.name}</span>
                <a
                  href={person.href}
                  className="num font-semibold text-slate-800 hover:text-brand-700"
                >
                  {person.phone}
                </a>
              </li>
            ))}
            <li className="flex items-center justify-between gap-2">
              <span className="text-slate-600">משרד</span>
              <a href={company.phoneHref} className="num font-semibold text-slate-800 hover:text-brand-700">
                {company.phone}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={company.sales[0].whatsapp}
              className="btn btn-primary text-[13px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              וואטסאפ למכירות
            </a>
            <a href={`mailto:${company.email}`} className="btn btn-ghost text-[13px]">
              שליחת מייל
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. המחירים באתר אינם כוללים הובלה והתקנה אלא
            אם צוין אחרת, וכפופים לשינוי.
          </p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-slate-800">
              הצהרת נגישות
            </a>
            <a href="#" className="hover:text-slate-800">
              מדיניות פרטיות
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
