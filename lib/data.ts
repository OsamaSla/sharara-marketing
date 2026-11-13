import type { Category, Group, Product, Settings } from "./types";

export const company = {
  name: "עלי שאראה בע״מ",
  nameEn: "Ali Sharara Ltd.",
  tagline: "מסגרות מתכת · מיזוג אוויר · עבודות מתכת",
  short: "ייצור מתכת, מכולות אשפתון ומערכות מיזוג",
  phone: "04-6082264",
  phoneHref: "tel:+97246082264",
  email: "Fares1.sharara@gmail.it",
  address: "אזור תעשייה",
  sales: [
    {
      name: "פארס שאראה",
      phone: "053-581-9466",
      href: "tel:+972535819466",
      whatsapp: "https://wa.me/972535819466",
    },
    {
      name: "מג׳די שאראה",
      phone: "053-538-9378",
      href: "tel:+972535389378",
      whatsapp: "https://wa.me/972535389378",
    },
  ],
};

/** Cross-section constants taken from the shop's own dimension drawing. */
export const skipGeometry = {
  topWidthMm: 1433,
  bottomWidthMm: 500,
  heightMm: 1184,
};

export const groups: Group[] = [
  {
    slug: "skips",
    name: "מכולות אשפתון",
    english: "Dumpster skips",
    blurb: "מכולת הטיה לפריקה עצמית במלגזה, עם מחירון לפי אורך.",
  },
  {
    slug: "tin",
    name: "תעשיות פח",
    english: "Sheet-metal works",
    blurb: "ארונות כיבוי אש, צנרת ספירלית, תעלות עשן ומערכות השקטה.",
  },
  {
    slug: "hvac",
    name: "עבודות מיזוג אוויר ואוורור",
    english: "HVAC works",
    blurb: "תעלות פח ללחץ נמוך, בינוני וגבוה, פלינומים, גרילים ואבזרים.",
  },
  {
    slug: "products",
    name: "מוצרים",
    english: "Products",
    blurb: "חיתוך CNC, זוויות פלדה, תנורי חימום ועבודות מתכת בהתאמה.",
  },
];

export const categories: Category[] = [
  {
    slug: "skips",
    name: "מכולות אשפתון",
    english: "Dumpster skips",
    blurb: "מכולת הטיה לפריקה עצמית במלגזה, בחמש מידות סטנדרטיות.",
    status: "live",
    group: "skips",
  },
  {
    slug: "fire-cabinets",
    name: "ארונות כיבוי אש",
    english: "Fire hose cabinets",
    blurb: "ארונות כיבוי אש לפי התקן, לגלילון ולמטף.",
    status: "quote",
    group: "tin",
  },
  {
    slug: "spiral",
    name: "צינורות ספירל",
    english: "Spiral duct",
    blurb: "צנרת אוויר עגולה בקטרים ובעוביים לפי הפרויקט.",
    status: "calc",
    group: "tin",
  },
  {
    slug: "smoke-ducts",
    name: "תעלות מיזוג ושחרור עשן",
    english: "HVAC & smoke exhaust duct",
    blurb: "תעלות פח למערכות מיזוג ופינוי עשן, כולל אטימה.",
    status: "quote",
    group: "tin",
  },
  {
    slug: "silencers",
    name: "מניעת רעשים ומדפי אש",
    english: "Silencers & fire dampers",
    blurb: "משתיקי רעש, מדפי אש ומעברי תעלה עם בידוד אקוסטי.",
    status: "quote",
    group: "tin",
  },
  {
    slug: "rect",
    name: "תעלות פח ללחץ נמוך/בינוני/גבוה",
    english: "Rectangular duct",
    blurb: "תעלות מלבניות לפי שרטוט, בשלוש דרגות לחץ.",
    status: "calc",
    group: "hvac",
  },
  {
    slug: "plenums",
    name: "פלינומים",
    english: "Plenum boxes",
    blurb: "תיבות אוויר ופלינומים לפי רוחב, גובה ואורך.",
    status: "live",
    group: "hvac",
  },
  {
    slug: "ahu",
    name: "יחידות טיפול באוויר",
    english: "Air handling units",
    blurb: "יחידות טיפול באוויר (AHU) לפי מפרט הפרויקט.",
    status: "quote",
    group: "hvac",
  },
  {
    slug: "grilles",
    name: "גרילים ומפזרים מאלומיניום",
    english: "Aluminium grilles & diffusers",
    blurb: "גרילי פליטה, תריסים ומפזרים בגימור אלומיניום.",
    status: "quote",
    group: "hvac",
  },
  {
    slug: "accessories",
    name: "אבזרי מיזוג",
    english: "HVAC accessories",
    blurb: "מחברים, תומכות, אטמים ואביזרי התקנה לתעלות.",
    status: "quote",
    group: "hvac",
  },
  {
    slug: "cnc",
    name: "חיתוך CNC",
    english: "CNC cutting",
    blurb: "חיתוך פח בפלזמה ובלייזר לפי קובץ DXF.",
    status: "quote",
    group: "products",
  },
  {
    slug: "angles",
    name: "זוויות",
    english: "Angle profiles",
    blurb: "זוויות מתכת במידות ובאורכים לפי הזמנה.",
    status: "quote",
    group: "products",
  },
  {
    slug: "heaters",
    name: "תנורי חימום",
    english: "Unit heaters",
    blurb: "תנורי חימום ומערכות חימום אוויר למבני מפעל.",
    status: "quote",
    group: "products",
  },
  {
    slug: "metalwork",
    name: "עבודות מתכת",
    english: "Custom metalwork",
    blurb: "מסגרות, מעקות, שולחנות עבודה ומבני פלדה לפי הזמנה.",
    status: "quote",
    group: "products",
  },
];

export const defaultSettings: Settings = {
  priceListStatus: "draft",
  priceListDate: null,
  /** net agorot per m² of sheet, by thickness */
  calcRates: [
    { thicknessMm: 0.5, rateNetPerSqm: 12000 },
    { thicknessMm: 0.6, rateNetPerSqm: 13500 },
    { thicknessMm: 0.7, rateNetPerSqm: 15000 },
    { thicknessMm: 0.8, rateNetPerSqm: 16500 },
    { thicknessMm: 1.0, rateNetPerSqm: 19500 },
    { thicknessMm: 1.2, rateNetPerSqm: 23000 },
  ],
};

export const seedProducts: Product[] = [
  {
    id: "p-skip",
    slug: "ashpaon",
    name: "מכולת אשפתון",
    subtitle: "הטיה עצמית · כיסי מלגזה · 5 מידות",
    category: "skips",
    group: "skips",
    description:
      "מכולת פלדה מרותכת לפריקה עצמית במלגזה: נוסעים אל הפסולת, מרימים, מטים — ומרוקנים בלי לרדת מהכלי. מתאימה לפסולת בניין, גזם, אריזות וחומרי גלם. הגוף נבנה במפעל אצלנו, כולל שפת חיזוק עליונה וכיסי מלגזה מרותכים.",
    highlights: ["פריקה עצמית בהטיה", "כיסי מלגזה מרותכים", "שפת חיזוק עליונה", "צביעה תעשייתית"],
    included: [
      "גוף פלדה מרותך עם שפת חיזוק עליונה.",
      "כיסי מלגזה מרותכים, פריקה עצמית בהטיה.",
      "צביעה תעשייתית בגוון לפי בחירה.",
      "ייצור במפעל שלנו — אפשר גם מידה מיוחדת בהזמנה.",
    ],
    specs: [
      { label: "חומר", value: "פלדה מרותכת" },
      { label: "רוחב עליון", value: "1,433 מ״מ" },
      { label: "רוחב תחתון", value: "500 מ״מ" },
      { label: "גובה", value: "1,184 מ״מ" },
      { label: "מידות אורך", value: "מ־100 עד 200 ס״מ" },
      { label: "פריקה", value: "הטיה עצמית במלגזה" },
    ],
    documents: [
      { name: "מחירון מכולות אשפתון", meta: "PDF · בקרוב" },
      { name: "שרטוט מידות", meta: "PDF · בקרוב" },
    ],
    status: "published",
    kind: "table",
    image: "/products/ashpaon-hopper.jpg",
    imageWidth: 1024,
    imageHeight: 768,
    photoFirst: true,
    drawing: {
      src: "/specs/ashpaon-baby-my.png",
      alt: "מכולת אשפתון דגם BABY MY — שרטוט חזית עם מידות: רוחב עליון 1,433 מ״מ, גובה 1,184 מ״מ, בסיס 500 מ״מ",
      width: 1280,
      height: 720,
      caption:
        "שרטוט חזית — דגם BABY MY. רוחב עליון 1,433 מ״מ · גובה 1,184 מ״מ · בסיס 500 מ״מ · זוויות 135° / 97°.",
    },
    sizes: [
      { id: "s-100", label: "100 ס״מ", lengthCm: 100, volumeM3: 1.14, weightKg: 155, weightEstimated: true, priceNetAgorot: 350000, dealerNetAgorot: null },
      { id: "s-125", label: "125 ס״מ", lengthCm: 125, volumeM3: 1.43, weightKg: 170, weightEstimated: true, priceNetAgorot: 450000, dealerNetAgorot: null },
      { id: "s-150", label: "150 ס״מ", lengthCm: 150, volumeM3: 1.72, weightKg: 190, weightEstimated: true, priceNetAgorot: 550000, dealerNetAgorot: null },
      { id: "s-170", label: "170 ס״מ", lengthCm: 170, volumeM3: 1.95, weightKg: 205, weightEstimated: true, priceNetAgorot: 650000, dealerNetAgorot: null },
      { id: "s-200", label: "200 ס״מ", lengthCm: 200, volumeM3: 2.29, weightKg: 230, weightEstimated: true, priceNetAgorot: 750000, dealerNetAgorot: null },
    ],
  },
  {
    id: "p-plenum",
    slug: "plenum",
    name: "פלינום",
    subtitle: "תיבת אוויר לפי רוחב, גובה ואורך",
    category: "plenums",
    group: "hvac",
    description:
      "פלינום הוא תיבת הפח שמחברת בין תעלה למפוזר, בין יחידת טיפול באוויר לתעלה, או בין שני חתכים שונים. אנחנו מייצרים אותו לפי מידות פנימיות מדויקות — רוחב, גובה ואורך — כולל אוגנים, פתח גישה ובידוד לפי דרישה. שרטוטי הפתחים מלמטה.",
    highlights: [
      "מידות פנימיות לפי שרטוט",
      "אוגנים ואטימה",
      "פתח גישה ובידוד",
      "ייצור במפעל שלנו",
    ],
    included: [
      "תיבת פח מגולוון מרותכת או מקופלת, לפי גודל.",
      "אוגנים בשני הקצוות במידה סטנדרטית.",
      "פתח גישה, מעבר, מרפק או הסתעפות — בתוספת מחיר.",
      "בידוד 25 מ״מ או 50 מ״מ לפי דרישה.",
    ],
    specs: [
      { label: "מידות", value: "רוחב × גובה × אורך" },
      { label: "עובי פח", value: "0.6 עד 1.0 מ״מ" },
      { label: "בידוד", value: "25 / 50 מ״מ" },
      { label: "אטימה", value: "סיליקון / אטם גומי" },
    ],
    documents: [{ name: "שרטוטי פלינום", meta: "מוצג בתמונת המוצר" }],
    status: "published",
    kind: "table",
    image: "/products/plenum.jpg",
    imageWidth: 1303,
    imageHeight: 816,
    photoFirst: true,
    drawing: {
      src: "/specs/plenum-sections.png",
      alt: "פלינום בצורות שונות — ארבעה חתכים: 150×150, 190×175, 250×200 ו־250×300 מ״מ, עומק 180 מ״מ",
      width: 1280,
      height: 720,
      caption:
        "חתכים סטנדרטיים (מ״מ): 150×150 · 190×175 · 250×200 · 250×300 · עומק 180 מ״מ — פתחים בקטרים שונים בכל צד לפי דרישה.",
    },
    adders: [
      { label: "מעבר", note: "שינוי חתך בין שני צדדים", percent: 15 },
      { label: "מרפק L", note: "שינוי כיוון 90°", percent: 25 },
      { label: "הסתעפות T", note: "יציאה נוספת מהתיבה", percent: 30 },
      { label: "פתח גישה", note: "דלת שירות עם ידיות", percent: 8 },
      { label: "בידוד 25 מ״מ", note: "בידוד פנימי דק", percent: 12 },
    ],
    sizes: [
      { id: "pl-40-30-50", label: "40×30×50", widthCm: 40, heightCm: 30, lengthCm: 50, volumeM3: 0.06, weightKg: 6, weightEstimated: true, priceNetAgorot: 65000, dealerNetAgorot: null, provisional: true },
      { id: "pl-50-40-75", label: "50×40×75", widthCm: 50, heightCm: 40, lengthCm: 75, volumeM3: 0.15, weightKg: 10, weightEstimated: true, priceNetAgorot: 90000, dealerNetAgorot: null, provisional: true },
      { id: "pl-60-40-100", label: "60×40×100", widthCm: 60, heightCm: 40, lengthCm: 100, volumeM3: 0.24, weightKg: 14, weightEstimated: true, priceNetAgorot: 125000, dealerNetAgorot: null, provisional: true },
      { id: "pl-80-60-100", label: "80×60×100", widthCm: 80, heightCm: 60, lengthCm: 100, volumeM3: 0.48, weightKg: 19, weightEstimated: true, priceNetAgorot: 190000, dealerNetAgorot: null, provisional: true },
      { id: "pl-100-60-125", label: "100×60×125", widthCm: 100, heightCm: 60, lengthCm: 125, volumeM3: 0.75, weightKg: 27, weightEstimated: true, priceNetAgorot: 260000, dealerNetAgorot: null, provisional: true },
      { id: "pl-120-80-150", label: "120×80×150", widthCm: 120, heightCm: 80, lengthCm: 150, volumeM3: 1.44, weightKg: 40, weightEstimated: true, priceNetAgorot: 360000, dealerNetAgorot: null, provisional: true },
    ],
  },
  {
    id: "p-spiral",
    slug: "spiral-duct",
    name: "צינור ספירלי",
    subtitle: "צנרת אוויר עגולה · לפי קוטר ועובי",
    category: "spiral",
    group: "tin",
    description:
      "צנרת אוויר עגולה לתעלות מיזוג, בקטרים ובעובי פח לפי דרישות הפרויקט. מיוצרת במפעל, כולל חיבורים ואיטום. המחיר המוצג הוא הערכה לפי מ״ר פח — המחיר הסופי נקבע לפי שרטוט וכמויות.",
    highlights: ["קוטרים 80 עד 1,600 מ״מ", "פח מגולוון / אלומיניום", "חיבור זכר־נקבה", "ייצור לפי אורך"],
    included: [
      "צינור ספירלי מגולוון בעובי לפי בחירה.",
      "חיבור זכר־נקבה בקצוות.",
      "אורך לפי הזמנה, עד 3 מטר לקטע.",
      "אפשרות לציפוי אלומיניום או בידוד חיצוני.",
    ],
    specs: [
      { label: "קוטר", value: "80 עד 1,600 מ״מ" },
      { label: "עובי פח", value: "0.5 עד 1.2 מ״מ" },
      { label: "אורך סטנדרטי", value: "3 מטר" },
      { label: "חומר", value: "מגולוון / אלומיניום" },
    ],
    documents: [{ name: "מפרט טכני", meta: "PDF · בקרוב" }],
    status: "published",
    kind: "calc",
    image: "/products/spiral-duct.jpg",
    calc: { type: "spiral", rateFactor: 1, spreadPercent: 12, minChargeNetAgorot: 25000 },
    sizes: [],
  },
  {
    id: "p-rect",
    slug: "rect-duct",
    name: "תעלות פח מלבניות",
    subtitle: "לחץ נמוך / בינוני / גבוה",
    category: "rect",
    group: "hvac",
    description:
      "תעלות פח מלבניות למערכות מיזוג ואוורור, בשלוש דרגות לחץ ובמידות לפי שרטוט. התעלה נבנית מקיפולים וריתוך לפי דרישת האטימה, כולל אוגנים ופתחי גישה. המחיר המוצג הוא הערכה לפי מ״ר פח.",
    highlights: ["לחץ נמוך / בינוני / גבוה", "מידות לפי שרטוט", "אוגנים ופתחי גישה", "עובי פח לפי דרישה"],
    included: [
      "תעלה מלבנית מקופלת עם תפר פיטסבורג או ריתוך.",
      "אוגנים בשני הקצוות.",
      "פתחי גישה ואטימה לפי דרישה.",
      "בידוד פנימי או חיצוני בתוספת.",
    ],
    specs: [
      { label: "עובי פח", value: "0.6 עד 1.2 מ״מ" },
      { label: "דרגות לחץ", value: "נמוך / בינוני / גבוה" },
      { label: "אורך קטע", value: "עד 2.5 מטר" },
      { label: "חומר", value: "פח מגולוון" },
    ],
    documents: [{ name: "מפרט טכני", meta: "PDF · בקרוב" }],
    status: "published",
    kind: "calc",
    image: "/products/rect-duct.jpg",
    calc: { type: "rect", rateFactor: 1.15, spreadPercent: 15, minChargeNetAgorot: 30000 },
    sizes: [],
  },
  {
    id: "p-fire-cabinets",
    slug: "fire-cabinets",
    name: "ארונות כיבוי אש",
    subtitle: "לפי התקן · גלילון ומטף",
    category: "fire-cabinets",
    group: "tin",
    description:
      "ארונות כיבוי אש לפח ולגלילון, לפי דרישות התקן הישראלי. מיוצרים מפח מגולוון או צבוע, עם דלת זכוכית או פח, מנעול ואטם. מיוצרים במידות סטנדרטיות או לפי מידות הפרויקט.",
    highlights: ["לפי התקן הישראלי", "דלת זכוכית או פח", "גימור צבוע / מגולוון", "מידות לפי פרויקט"],
    specs: [
      { label: "חומר", value: "פח מגולוון / צבוע" },
      { label: "דלת", value: "זכוכית / פח" },
      { label: "התאמה", value: "גלילון / מטף" },
    ],
    documents: [{ name: "קטלוג ארונות", meta: "PDF · בקרוב" }],
    status: "published",
    kind: "quote",
    image: "/products/fire-cabinets.jpg",
    sizes: [],
  },
  {
    id: "p-smoke-ducts",
    slug: "smoke-ducts",
    name: "תעלות מיזוג ושחרור עשן",
    subtitle: "אטימות גבוהה · לפי שרטוט",
    category: "smoke-ducts",
    group: "tin",
    description:
      "תעלות פח למערכות מיזוג ופינוי עשן, כולל תעלות לחץ גבוה ותעלות עשן באטימות מוגברת. מיוצרות לפי שרטוט ותוכנית מיזוג, עם חיבורים, אוגנים ותומכות.",
    highlights: ["תעלות עשן אטומות", "לחץ גבוה", "ריתוך לפי דרישה", "התקנה ותומכות"],
    specs: [
      { label: "עובי פח", value: "0.8 עד 1.4 מ״מ" },
      { label: "אטימה", value: "לפי דרישת המערכת" },
      { label: "צורה", value: "עגול / מלבני" },
    ],
    documents: [{ name: "מפרט תעלות עשן", meta: "PDF · בקרוב" }],
    status: "published",
    kind: "quote",
    image: "/products/smoke-ducts.jpg",
    sizes: [],
  },
  {
    id: "p-silencers",
    slug: "silencers",
    name: "מניעת רעשים ומדפי אש",
    subtitle: "משתיקים · מדפי אש · בידוד אקוסטי",
    category: "silencers",
    group: "tin",
    description:
      "מערכות השקטה לתעלות מיזוג: משתיקי רעש מלבניים ועגולים, מדפי אש ומעברי תעלה עם בידוד אקוסטי. הפתרונות נבנים לפי מפרט הפרויקט ורמת ההשקטה הנדרשת.",
    highlights: ["משתיקי רעש", "מדפי אש", "בידוד אקוסטי", "לפי מפרט"],
    specs: [
      { label: "סוג", value: "משתיק / מדף אש" },
      { label: "בידוד", value: "צמר סלעים / פיברגלס" },
      { label: "מבנה", value: "מלבני / עגול" },
    ],
    documents: [{ name: "מפרט אקוסטי", meta: "PDF · בקרוב" }],
    status: "published",
    kind: "quote",
    image: "/products/silencers.jpg",
    sizes: [],
  },
  {
    id: "p-ahu",
    slug: "ahu",
    name: "יחידות טיפול באוויר",
    subtitle: "AHU · לפי מפרט הפרויקט",
    category: "ahu",
    group: "hvac",
    description:
      "יחידות טיפול באוויר (AHU) במבנה פח מבודד, לפי מפרט הפרויקט: ספיקות, מסננים, סוללות ופתחי שירות. היחידה נבנית בהתאמה לתנאי השטח ולמערכת הבקרה.",
    highlights: ["מבנה פח מבודד", "פתחי שירות", "לפי ספיקה ומפרט", "התאמה למערכת בקרה"],
    specs: [
      { label: "מבנה", value: "פח מבודד" },
      { label: "ספיקה", value: "לפי מפרט" },
      { label: "שירות", value: "פתחי גישה מלאים" },
    ],
    documents: [{ name: "מפרט AHU", meta: "PDF · בקרוב" }],
    status: "published",
    kind: "quote",
    image: "/products/ahu.jpg",
    sizes: [],
  },
  {
    id: "p-grilles",
    slug: "grilles",
    name: "גרילים ומפזרים מאלומיניום",
    subtitle: "פליטה · יניקה · מפזרים",
    category: "grilles",
    group: "hvac",
    description:
      "גרילי אלומיניום לפליטה וליניקה, תריסים ומפזרים לתקרה ולקיר. מיוצרים בגדלים סטנדרטיים או לפי מידות הפתח בשטח, בגימור אלומיניום נקי.",
    highlights: ["אלומיניום אנודייז", "פליטה / יניקה", "מידות לפי פתח", "תריסים מתכווננים"],
    specs: [
      { label: "חומר", value: "אלומיניום" },
      { label: "סוג", value: "גריל / מפזר / תריס" },
      { label: "גימור", value: "אנודייז / צבוע" },
    ],
    documents: [{ name: "קטלוג גרילים", meta: "PDF · בקרוב" }],
    status: "published",
    kind: "quote",
    image: "/products/grilles.jpg",
    sizes: [],
  },
  {
    id: "p-accessories",
    slug: "hvac-accessories",
    name: "אבזרי מיזוג",
    subtitle: "מחברים · תומכות · אטמים",
    category: "accessories",
    group: "hvac",
    description:
      "אביזרי התקנה למערכות תעלות: מחברים, תומכות, ברגים, אטמים, מכסי קצה ופתחי גישה. הכול בהתאמה לתעלות שאנחנו מייצרים, כדי שההרכבה תהיה מהירה ומדויקת.",
    highlights: ["מחברים ותומכות", "אטמים ומכסים", "התאמה לתעלות שלנו", "אספקה לפרויקט"],
    specs: [
      { label: "סוג", value: "אביזרי התקנה" },
      { label: "חומר", value: "פח / גומי / פלדה" },
    ],
    documents: [],
    status: "published",
    kind: "quote",
    image: "/products/accessories.jpg",
    sizes: [],
  },
  {
    id: "p-cnc",
    slug: "cnc",
    name: "חיתוך CNC",
    subtitle: "פלזמה ולייזר · לפי קובץ DXF",
    category: "cnc",
    group: "products",
    description:
      "חיתוך פח בפלזמה ובלייזר לפי קובץ DXF או שרטוט. מתאים לחלקי מכונה, תושבות, כיסויים וחלקים בהתאמה אישית — כולל כיפוף ועיבוד המשך.",
    highlights: ["פלזמה ולייזר", "קובץ DXF / שרטוט", "כיפוף ועיבוד המשך", "פח 1 עד 20 מ״מ"],
    specs: [
      { label: "שיטות", value: "פלזמה / לייזר" },
      { label: "עובי", value: "1 עד 20 מ״מ" },
      { label: "קלט", value: "DXF / PDF / שרטוט" },
    ],
    documents: [{ name: "הנחיות לקובץ חיתוך", meta: "PDF · בקרוב" }],
    status: "published",
    kind: "quote",
    image: "/products/cnc.png",
    sizes: [],
  },
  {
    id: "p-angles",
    slug: "angles",
    name: "זוויות",
    subtitle: "זווית פלדה במידות לפי הזמנה",
    category: "angles",
    group: "products",
    description:
      "זוויות מתכת לחיזוק, מסגור ותמיכה — במידות ובאורכים לפי הזמנה. אפשר לספק גלוון, צביעה או חיתוך באורך מדויק.",
    highlights: ["מידות לפי הזמנה", "חיתוך מדויק", "גלוון / צביעה", "אספקה מהירה"],
    specs: [
      { label: "חומר", value: "פלדה" },
      { label: "אורך", value: "לפי הזמנה" },
      { label: "גימור", value: "גלוון / צבע" },
    ],
    documents: [],
    status: "published",
    kind: "quote",
    image: "/products/angles.jpg",
    sizes: [],
  },
  {
    id: "p-heaters",
    slug: "heaters",
    name: "תנורי חימום",
    subtitle: "חימום אוויר למבני מפעל",
    category: "heaters",
    group: "products",
    description:
      "תנורי חימום אוויר לחימום מבני תעשייה, מחסנים ובתי מלאכה. נבחרים לפי נפח החלל, רמת הבידוד וגובה התקרה, כולל התאמה למערכת אוורור קיימת.",
    highlights: ["למבני תעשייה", "התאמה לפי נפח", "חיבור לתעלות", "התקנה ותחזוקה"],
    specs: [
      { label: "ייעוד", value: "מפעל / מחסן" },
      { label: "דלק", value: "גז / חשמל" },
      { label: "התאמה", value: "לפי נפח החלל" },
    ],
    documents: [{ name: "מפרט תנורים", meta: "PDF · בקרוב" }],
    status: "published",
    kind: "quote",
    image: "/products/heaters.jpg",
    sizes: [],
  },
  {
    id: "p-metalwork",
    slug: "metalwork",
    name: "עבודות מתכת",
    subtitle: "מסגרות ומבנים לפי הזמנה",
    category: "metalwork",
    group: "products",
    description:
      "עבודות מתכת כלליות במפעל: מסגרות, מעקות, שולחנות עבודה, מבני פלדה ותיקונים. עובדים לפי שרטוט או לפי מדידה בשטח.",
    highlights: ["לפי שרטוט או מדידה", "ריתוך וצביעה", "עבודות חד־פעמיות", "שירותי תיקון"],
    specs: [
      { label: "חומר", value: "פלדה / אלומיניום" },
      { label: "גימור", value: "צבע / גלוון" },
    ],
    documents: [],
    status: "published",
    kind: "quote",
    image: "/products/metalwork.jpg",
    imageWidth: 1280,
    imageHeight: 853,
    photoCredit: "תמונה להמחשה — Shixart1985 / CC BY 2.0",
    sizes: [],
  },
];

export function categoryOf(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function categoryName(slug: string): string {
  return categoryOf(slug)?.name ?? slug;
}

export function groupOf(slug: string): Group | undefined {
  return groups.find((group) => group.slug === slug);
}

export function groupName(slug: string): string {
  return groupOf(slug)?.name ?? slug;
}

export function categoriesOfGroup(groupSlug: string): Category[] {
  return categories.filter((category) => category.group === groupSlug);
}

export function productsOfGroup(products: Product[], groupSlug: string): Product[] {
  return products.filter((product) => product.group === groupSlug);
}

/** Cheapest priced table row, or null when the product has no public price. */
export function cheapestSize(product: Product) {
  const priced = product.sizes.filter((size) => size.priceNetAgorot > 0);
  if (priced.length === 0) return undefined;
  return priced.reduce((min, size) => (size.priceNetAgorot < min.priceNetAgorot ? size : min));
}
