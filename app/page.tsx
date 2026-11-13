import Image from "next/image";
import Link from "next/link";
import FeaturedProducts from "@/components/FeaturedProducts";
import QuoteDialog from "@/components/QuoteDialog";
import { groups, company, seedProducts } from "@/lib/data";
import { formatNum, formatILS, withVat } from "@/lib/pricing";
import { asset } from "@/lib/site";

const stats = [
  { value: "5", label: "מידות סטנדרטיות" },
  { value: "1.14–2.29", label: "מ״ק נפח" },
  { value: "100%", label: "ייצור במפעל שלנו" },
];

/** One real photo per group — no illustrations on the home page. */
const groupArt: Record<string, { src: string; alt: string; width: number; height: number }> = {
  skips: {
    src: "/products/ashpaon-hopper.jpg",
    alt: "מכולת אשפתון מפלדה עם כיסי מלגזה",
    width: 1024,
    height: 768,
  },
  tin: {
    src: "/products/fire-cabinets.jpg",
    alt: "ארון כיבוי אש מפלדה",
    width: 292,
    height: 238,
  },
  hvac: {
    src: "/products/spiral-duct.jpg",
    alt: "צינור ספירלי מגולוון",
    width: 292,
    height: 238,
  },
  products: {
    src: "/products/cnc.png",
    alt: "לוחות מחורצים בחיתוך CNC",
    width: 292,
    height: 238,
  },
};

const advantages = [
  {
    title: "מידות אמיתיות, לא ״בקרוב אצלכם״",
    body: "כל מידה בטבלה מציגה אורך, נפח ומשקל משוער — לפני שביקשתם הצעה. כך אפשר לתכנן את הפינוי מראש.",
    icon: "ruler",
  },
  {
    title: "מחירון גלוי או הערכה",
    body: "מכולות ופלינומים עם מחירון לפי מידות, צנרת ספירלית ותעלות מלבניות עם מחשבון הערכה לפי מ״ר פח. השאר — בהצעת מחיר מסודרת.",
    icon: "tag",
  },
  {
    title: "מיוצר ומתוקן אצלנו",
    body: "ריתוך, כיפוף וצביעה במפעל. אותו גורם שמכר לכם את המכולה הוא גם זה שמתקן אותה.",
    icon: "shield",
  },
];

function AdvantageIcon({ name }: { name: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "ruler") {
    return (
      <svg {...common}>
        <path d="M3 9h18v6H3z" />
        <path d="M7 9v3M11 9v3M15 9v3M19 9v3" />
      </svg>
    );
  }
  if (name === "tag") {
    return (
      <svg {...common}>
        <path d="M20.5 12.5L12 21l-9-9 8.5-8.5H20v9z" />
        <circle cx="16" cy="8" r="1.4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function HomePage() {
  const skip = seedProducts.find((product) => product.slug === "ashpaon");
  const firstSize = skip?.sizes[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -start-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 end-0 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11.5px] font-semibold text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              {company.tagline}
            </span>

            <h1 className="mt-4 text-[30px] font-extrabold leading-[1.15] sm:text-[42px]">
              מכולות אשפתון
              <br />
              לפריקה עצמית במלגזה.
            </h1>

            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/70">
              מכולת פלדה מרותכת שנבנית אצלנו, בחמש מידות סטנדרטיות. מרימים במלגזה, מטים, מרוקנים —
              בלי לרדת מהכלי. עם נפח, משקל ומחירון לכל מידה.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products/ashpaon" className="btn btn-primary">
                למידות ולמחירון
              </Link>
              <QuoteDialog label="בקשת הצעת מחיר" variant="light" />
            </div>

            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[11px] text-white/60">{stat.label}</dt>
                  <dd className="num mt-1 text-xl font-extrabold">
                    <bdi dir="ltr">{stat.value}</bdi>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <div className="rounded-2xl bg-gradient-to-b from-white to-slate-100 p-3">
                <Image
                  src={asset("/products/ashpaon-hopper.jpg")}
                  alt="מכולת אשפתון מפלדה לפריקה עצמית במלגזה"
                  width={1024}
                  height={768}
                  priority
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="h-64 w-full rounded-xl object-contain"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/10 px-3 py-2 text-[11.5px] text-white/80">
                <bdi className="num font-semibold">אורך 100–200 ס״מ</bdi>
                <span>רוחב 1,433 מ״מ · גובה 1,184 מ״מ</span>
                {firstSize && (
                  <span className="num font-bold text-brand-200">
                    {formatILS(withVat(firstSize.priceNetAgorot))} ומעלה
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">מה אנחנו מייצרים</h2>
            <p className="mt-1 text-[13.5px] text-slate-600">
              ארבע קבוצות: מכולות אשפתון, תעשיות פח, מיזוג ואוורור ומוצרים — 14 פריטים תחת קורת גג
              אחת.
            </p>
          </div>
          <Link href="/products" className="text-[13px] font-bold text-brand-700 hover:underline">
            לכל הקטלוג
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => {
            const art = groupArt[group.slug] ?? groupArt.products;
            const count = seedProducts.filter(
              (product) => product.group === group.slug && product.status === "published",
            ).length;
            return (
              <Link
                key={group.slug}
                href={`/products?group=${group.slug}`}
                className="card group overflow-hidden transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
              >
                <div className="grid-lines flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-3">
                  <Image
                    src={asset(art.src)}
                    alt={art.alt}
                    width={art.width}
                    height={art.height}
                    sizes="(min-width: 1024px) 260px, 45vw"
                    className="h-32 w-auto max-w-full rounded-lg object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[14.5px] font-bold text-slate-900 group-hover:text-brand-700">
                      {group.name}
                    </h3>
                    <span className="chip">
                      {count === 1 ? "מוצר אחד" : `${count} מוצרים`}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{group.blurb}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:pb-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">מוצרים</h2>
            <p className="mt-1 text-[13.5px] text-slate-600">
              המחירים מוצגים לפי סוג המחיר שבחרתם למעלה.
            </p>
          </div>
        </div>
        <div className="mt-5">
          <FeaturedProducts limit={6} />
        </div>
      </section>

      {/* Advantages */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">למה לקנות מאיתנו</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {advantages.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <AdvantageIcon name={item.icon} />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume table */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">כמה נפח יש בכל מידה?</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
              חתך המכולה קבוע — רוחב עליון 1,433 מ״מ, רוחב תחתון 500 מ״מ וגובה 1,184 מ״מ — ולכן כל
              סנטימטר אורך מוסיף 0.0114 מ״ק. זו השאלה הראשונה של כל קונה, ולכן היא מופיעה בטבלה ולא
              רק בשרטוט.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/products/ashpaon" className="btn btn-primary">
                לטבלת המידות והמחירון
              </Link>
              <QuoteDialog label="אורך אחר? הצעת מחיר" variant="ghost" />
            </div>
          </div>

          <div className="card overflow-hidden">
            <table className="w-full text-[13.5px]">
              <caption className="sr-only">נפח מכולת אשפתון לפי אורך</caption>
              <thead>
                <tr className="bg-slate-50 text-[11.5px] font-semibold text-slate-600">
                  <th className="px-4 py-2.5 text-start">אורך</th>
                  <th className="px-4 py-2.5 text-start">נפח</th>
                  <th className="px-4 py-2.5 text-start">משקל משוער</th>
                </tr>
              </thead>
              <tbody>
                {(skip?.sizes ?? []).map((size) => (
                  <tr key={size.id} className="border-t border-slate-100">
                    <td className="num px-4 py-2.5 font-semibold text-slate-800">
                      <bdi dir="ltr">{size.label}</bdi>
                    </td>
                    <td className="num px-4 py-2.5 text-slate-700">
                      {formatNum(size.volumeM3, 2)} מ״ק
                    </td>
                    <td className="num px-4 py-2.5 text-slate-600">
                      {formatNum(size.weightKg)} ק״ג
                      {size.weightEstimated && (
                        <span className="ms-1 text-[10px] font-semibold text-amber-700">משוער</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-4">
        <div className="relative overflow-hidden rounded-3xl bg-night px-6 py-10 text-white sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 end-10 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">צריכים מכולה, פלינום או תעלות?</h2>
              <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-white/70">
                דברו עם אנשי המכירות שלנו, או שלחו מידות ושרטוט ונחזור עם הצעה מסודרת. מכולה, פלינום,
                צנרת ספירלית, תעלות או עבודת מתכת — גם את זה אפשר לסגור בשיחה אחת.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <QuoteDialog label="בקשת הצעת מחיר" variant="light" />
              <a href={company.phoneHref} className="btn btn-light num">
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
