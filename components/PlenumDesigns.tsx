import type { Adder } from "@/lib/types";

/**
 * Pricing adders for the plenum. The cross-sections themselves are the shop's own
 * drawing (`product.drawing`), not art generated here.
 */
export default function PlenumDesigns({ adders }: { adders: Adder[] }) {
  return (
    <section className="card mt-6 overflow-hidden" aria-labelledby="plenum-designs-title">
      <div className="border-b border-slate-200 p-4 sm:p-5">
        <h2 id="plenum-designs-title" className="text-base font-extrabold text-slate-900">
          צורות פלינום ותוספות מחיר
        </h2>
        <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
          החתכים מופיעים בשרטוט שבתחילת העמוד. כל תוספת מתומחרת באחוזים ממחיר המידה הבסיסית
          שבטבלה.
        </p>
      </div>

      <table className="w-full text-[13px]">
        <caption className="sr-only">תוספות מחיר לצורות פלינום</caption>
        <thead>
          <tr className="bg-slate-50 text-[11.5px] font-semibold text-slate-600">
            <th className="px-4 py-2.5 text-start">תוספת</th>
            <th className="px-4 py-2.5 text-start">הסבר</th>
            <th className="px-4 py-2.5 text-start">תוספת מחיר</th>
          </tr>
        </thead>
        <tbody>
          {adders.map((adder) => (
            <tr key={adder.label} className="border-t border-slate-100">
              <td className="px-4 py-2.5 font-semibold text-slate-800">{adder.label}</td>
              <td className="px-4 py-2.5 text-slate-600">{adder.note}</td>
              <td className="num px-4 py-2.5 font-bold text-slate-800">
                <bdi dir="ltr">+{adder.percent}%</bdi>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-[11.5px] leading-relaxed text-slate-600 sm:px-5">
        התוספות והמחירים בטבלה הם הצעה ראשונית שלנו עד לקבלת המחירון הרשמי — פלינום במידה
        מיוחדת מתומחר בהצעת מחיר.
      </p>
    </section>
  );
}
