import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="text-[64px] font-extrabold leading-none text-brand-700">404</div>
      <h1 className="mt-3 text-xl font-extrabold text-slate-900">הדף לא נמצא</h1>
      <p className="mt-2 text-[13.5px] text-slate-500">
        ייתכן שהדגם הוסר מהקטלוג או שהקישור שגוי.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/products" className="btn btn-primary">
          לקטלוג המוצרים
        </Link>
        <Link href="/" className="btn btn-ghost">
          דף הבית
        </Link>
      </div>
    </div>
  );
}
