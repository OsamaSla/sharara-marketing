"use client";

import { useId } from "react";

const labels: Record<string, string> = {
  skips: "מכולת אשפתון — איור",
  spiral: "צינור ספירלי — איור",
  rect: "תעלה מלבנית — איור",
  plenums: "פלינום — איור",
  fittings: "מרפק תעלה — איור",
  custom: "עבודות מתכת — איור",
  "fire-cabinets": "ארון כיבוי אש — איור",
  "smoke-ducts": "תעלת עשן — איור",
  silencers: "משתיק רעש — איור",
  ahu: "יחידת טיפול באוויר — איור",
  grilles: "גריל אלומיניום — איור",
  accessories: "אבזרי מיזוג — איור",
  cnc: "חיתוך CNC — איור",
  angles: "זווית מתכת — איור",
  heaters: "תנור חימום — איור",
  metalwork: "עבודות מתכת — איור",
};

/** Reuse the five base drawings across the wider catalog. */
const artByCategory: Record<string, string> = {
  skips: "skips",
  spiral: "spiral",
  rect: "rect",
  plenums: "rect",
  "smoke-ducts": "rect",
  silencers: "rect",
  ahu: "rect",
};

export default function ProductVisual({
  category,
  className = "",
}: {
  category: string;
  className?: string;
}) {
  const art = artByCategory[category] ?? "custom";
  const uid = useId().replace(/[:]/g, "");
  const metal = `metal-${uid}`;
  const metalSide = `metal-side-${uid}`;
  const green = `green-${uid}`;
  const greenSide = `green-side-${uid}`;

  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label={labels[category] ?? "איור מוצר"}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbfdff" />
          <stop offset="100%" stopColor="#d3dfec" />
        </linearGradient>
        <linearGradient id={metalSide} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e6eef7" />
          <stop offset="100%" stopColor="#bccbdb" />
        </linearGradient>
        <linearGradient id={green} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecd058" />
          <stop offset="100%" stopColor="#d5ae26" />
        </linearGradient>
        <linearGradient id={greenSide} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c6a126" />
          <stop offset="100%" stopColor="#a8850f" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="192" rx="102" ry="10" fill="#0f172a" opacity="0.1" />

      {art === "skips" && (
        <g>
          {/* top face */}
          <polygon points="46,80 214,80 252,64 84,64" fill="#f1d97e" stroke="#b8940f" strokeWidth="1.5" />
          {/* side face */}
          <polygon points="214,80 252,64 226,166 190,180" fill={`url(#${greenSide})`} stroke="#a8850f" strokeWidth="1.5" />
          {/* front face */}
          <polygon points="46,80 214,80 190,180 70,180" fill={`url(#${green})`} stroke="#b8940f" strokeWidth="1.5" />
          {/* top rim */}
          <polyline
            points="46,80 214,80 252,64"
            fill="none"
            stroke="#fdf3cc"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* rim underside */}
          <polyline points="46,84 214,84" stroke="#b8940f" strokeWidth="2" opacity="0.6" />
          {/* base rail */}
          <polyline points="70,180 190,180 226,166" stroke="#8a6d0f" strokeWidth="3" fill="none" />
          {/* forklift pockets */}
          <rect x="82" y="162" width="32" height="18" rx="2" fill="#6e570c" />
          <rect x="148" y="162" width="32" height="18" rx="2" fill="#6e570c" />
          <rect x="86" y="166" width="24" height="10" rx="1.5" fill="#241d05" opacity="0.35" />
          <rect x="152" y="166" width="24" height="10" rx="1.5" fill="#241d05" opacity="0.35" />
          {/* side stiffener */}
          <line x1="228" y1="78" x2="205" y2="172" stroke="#8a6d0f" strokeWidth="1.5" opacity="0.5" />
          <line x1="120" y1="84" x2="110" y2="176" stroke="#b8940f" strokeWidth="1" opacity="0.35" />
          <line x1="165" y1="84" x2="158" y2="176" stroke="#b8940f" strokeWidth="1" opacity="0.35" />
        </g>
      )}

      {art === "spiral" && (
        <g>
          <rect x="108" y="58" width="104" height="108" fill={`url(#${metal})`} stroke="#bccbdb" />
          <ellipse cx="160" cy="58" rx="52" ry="14" fill="#f0f6fc" stroke="#bccbdb" strokeWidth="1.5" />
          <ellipse cx="160" cy="60" rx="42" ry="9" fill="#dfe9f4" opacity="0.8" />
          <ellipse cx="160" cy="166" rx="52" ry="14" fill="#cddae8" stroke="#bccbdb" strokeWidth="1.5" />
          <path d="M108 62 L108 166" stroke="#bccbdb" />
          <path d="M212 62 L212 166" stroke="#bccbdb" />
          <path d="M112 84 C150 96 170 78 208 90" fill="none" stroke="#a9bccf" strokeWidth="1.5" />
          <path d="M112 112 C150 124 170 106 208 118" fill="none" stroke="#a9bccf" strokeWidth="1.5" />
          <path d="M112 140 C150 152 170 134 208 146" fill="none" stroke="#a9bccf" strokeWidth="1.5" />
        </g>
      )}

      {art === "rect" && (
        <g>
          <rect x="62" y="76" width="152" height="84" fill={`url(#${metal})`} stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="214,76 254,58 254,142 214,160" fill={`url(#${metalSide})`} stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="62,76 102,58 254,58 214,76" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="62" y1="118" x2="214" y2="118" stroke="#b6c4d3" strokeWidth="1.5" />
          <line x1="102" y1="58" x2="102" y2="76" stroke="#b6c4d3" strokeWidth="1.5" />
          <rect x="86" y="90" width="26" height="18" rx="3" fill="#eef3f8" stroke="#94a3b8" />
          <rect x="132" y="90" width="26" height="18" rx="3" fill="#eef3f8" stroke="#94a3b8" />
        </g>
      )}

      {art === "fittings" && (
        <g>
          <path
            d="M84 172 L84 112 A58 58 0 0 1 142 54 L206 54"
            fill="none"
            stroke="#bccbdb"
            strokeWidth="40"
            strokeLinejoin="round"
            strokeLinecap="butt"
          />
          <path
            d="M84 172 L84 112 A58 58 0 0 1 142 54 L206 54"
            fill="none"
            stroke="#eef4fa"
            strokeWidth="28"
            strokeLinejoin="round"
            strokeLinecap="butt"
          />
          <path
            d="M84 152 L84 112 A58 58 0 0 1 142 68"
            fill="none"
            stroke="#c9d7e5"
            strokeWidth="2"
          />
          <line x1="78" y1="172" x2="90" y2="172" stroke="#9fb3c8" strokeWidth="2" />
          <line x1="206" y1="48" x2="206" y2="60" stroke="#9fb3c8" strokeWidth="2" />
        </g>
      )}

      {art === "custom" && (
        <g>
          <rect x="76" y="62" width="168" height="112" rx="4" fill="none" stroke="#bccbdb" strokeWidth="12" />
          <rect x="76" y="62" width="168" height="112" rx="4" fill="none" stroke="#eef4fa" strokeWidth="6" />
          <line x1="76" y1="62" x2="244" y2="174" stroke="#cddae8" strokeWidth="3" />
          <circle cx="76" cy="62" r="4" fill="#9fb3c8" />
          <circle cx="244" cy="62" r="4" fill="#9fb3c8" />
          <circle cx="76" cy="174" r="4" fill="#9fb3c8" />
          <circle cx="244" cy="174" r="4" fill="#9fb3c8" />
        </g>
      )}
    </svg>
  );
}
