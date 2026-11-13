"use client";

import { formatNum } from "@/lib/pricing";

/**
 * Dimension drawing for the skip, based on the shop's own cross-section:
 * top 1,433 mm, bottom 500 mm, height 1,184 mm, length variable.
 */
export default function DimensionDiagram({
  lengthCm,
  className = "",
}: {
  lengthCm: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 250"
      role="img"
      aria-label={`שרטוט מידות: אורך ${lengthCm} סנטימטר, רוחב עליון 1,433 מ״מ, גובה 1,184 מ״מ`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* body */}
      <polygon
        points="60,64 212,64 188,168 84,168"
        fill="#eef3f8"
        stroke="#94a3b8"
        strokeWidth="1.5"
      />
      {/* inner detail */}
      <polyline points="60,72 212,72" stroke="#b6c4d3" strokeWidth="1.5" />
      <polyline points="84,160 188,160" stroke="#b6c4d3" strokeWidth="1.5" />
      <line x1="90" y1="80" x2="90" y2="160" stroke="#c9d5e2" strokeWidth="1" strokeDasharray="4 4" />

      {/* top width */}
      <g stroke="#475569" strokeWidth="1">
        <line x1="60" y1="50" x2="212" y2="50" />
        <line x1="60" y1="46" x2="60" y2="54" />
        <line x1="212" y1="46" x2="212" y2="54" />
        <path d="M60 50 l6 -3 v6 z" fill="#475569" stroke="none" />
        <path d="M212 50 l-6 -3 v6 z" fill="#475569" stroke="none" />
      </g>
      <text x="136" y="40" textAnchor="middle" fontSize="10.5" fill="#334155" fontWeight="600">
        רוחב עליון 1,433 מ״מ
      </text>

      {/* height */}
      <g stroke="#475569" strokeWidth="1">
        <line x1="40" y1="64" x2="40" y2="168" />
        <line x1="36" y1="64" x2="44" y2="64" />
        <line x1="36" y1="168" x2="44" y2="168" />
        <path d="M40 64 l-3 6 h6 z" fill="#475569" stroke="none" />
        <path d="M40 168 l-3 -6 h6 z" fill="#475569" stroke="none" />
      </g>
      <text
        x="26"
        y="116"
        textAnchor="middle"
        fontSize="10.5"
        fill="#334155"
        fontWeight="600"
        transform="rotate(-90 26 116)"
      >
        גובה 1,184 מ״מ
      </text>

      {/* bottom width */}
      <g stroke="#475569" strokeWidth="1">
        <line x1="84" y1="180" x2="188" y2="180" />
        <line x1="84" y1="176" x2="84" y2="184" />
        <line x1="188" y1="176" x2="188" y2="184" />
        <path d="M84 180 l6 -3 v6 z" fill="#475569" stroke="none" />
        <path d="M188 180 l-6 -3 v6 z" fill="#475569" stroke="none" />
      </g>
      <text x="136" y="195" textAnchor="middle" fontSize="10.5" fill="#334155" fontWeight="600">
        רוחב תחתון 500 מ״מ
      </text>

      {/* length */}
      <g stroke="#1668d6" strokeWidth="1.2">
        <line x1="60" y1="216" x2="212" y2="216" />
        <line x1="60" y1="211" x2="60" y2="221" />
        <line x1="212" y1="211" x2="212" y2="221" />
        <path d="M60 216 l7 -3.5 v7 z" fill="#1668d6" stroke="none" />
        <path d="M212 216 l-7 -3.5 v7 z" fill="#1668d6" stroke="none" />
      </g>
      <text x="136" y="234" textAnchor="middle" fontSize="11" fill="#1153ad" fontWeight="700">
        אורך {formatNum(lengthCm)} ס״מ
      </text>
    </svg>
  );
}
