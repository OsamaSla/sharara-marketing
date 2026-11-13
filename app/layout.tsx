import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/Providers";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "עלי שאראה בע״מ — מכולות אשפתון, פלינומים, מיזוג אוויר ועבודות מתכת",
    template: "%s · עלי שאראה בע״מ",
  },
  description:
    "מפעל מתכת: מכולות אשפתון לפריקה עצמית, פלינומים, צנרת ספירלית, תעלות מיזוג, ארונות כיבוי אש, גרילים, חיתוך CNC ועבודות מתכת. מחירון, מחשבון הערכה והצעות מחיר.",
  metadataBase: new URL("https://sharara-metal.co.il"),
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "עלי שאראה בע״מ",
    title: "עלי שאראה בע״מ — מכולות אשפתון, פלינומים, מיזוג אוויר ועבודות מתכת",
    description:
      "14 מוצרים בארבע קבוצות: מכולות אשפתון ופלינומים עם מחירון לפי מידות, צנרת ספירלית ותעלות מיזוג עם מחשבון הערכה.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow"
          >
            דילוג לתוכן
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
