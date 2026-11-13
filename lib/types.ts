export type PriceMode = "gross" | "net" | "dealer";

/** live = priced table · calc = estimated range · quote = לפי הצעה */
export type CategoryStatus = "live" | "calc" | "quote";

/** Top-level menu group, mirrors the live site's three columns + skips. */
export type Group = {
  slug: string;
  name: string;
  english: string;
  blurb: string;
};

export type Category = {
  slug: string;
  name: string;
  english: string;
  blurb: string;
  status: CategoryStatus;
  /** slug of the owning `Group` */
  group: string;
};

/** How a product family is priced. */
export type ProductKind =
  /** fixed price rows (skips, plenum boxes) */
  | "table"
  /** estimated range from sheet m² (spiral / rectangular duct) */
  | "calc"
  /** no public price — quote only */
  | "quote";

export type CalcType = "spiral" | "rect";

/** One orderable size of a fabricated product. */
export type Size = {
  id: string;
  label: string;
  /** length along the duct / box, cm */
  lengthCm: number;
  /** box width & height in cm; omitted when only the length varies */
  widthCm?: number;
  heightCm?: number;
  volumeM3: number;
  weightKg: number;
  /** true until the shop confirms real plate thickness / unit weight */
  weightEstimated: boolean;
  priceNetAgorot: number;
  /** contractor price; null = "לפי הצעה" (priced per order) */
  dealerNetAgorot: number | null;
  /** seeded price that still has to be confirmed by the shop */
  provisional?: boolean;
};

/** Sheet price per m², by sheet thickness. Stored net in agorot. */
export type CalcRate = {
  thicknessMm: number;
  rateNetPerSqm: number;
};

export type CalcConfig = {
  type: CalcType;
  /** rect duct is welded and slower per m² than spiral */
  rateFactor: number;
  /** estimate tolerance shown as a range */
  spreadPercent: number;
  minChargeNetAgorot: number;
};

/** Optional fabrication extra offered on top of the base table price. */
export type Adder = {
  label: string;
  note: string;
  percent: number;
};

/** A real dimensioned drawing from the shop, kept in /public/specs. */
export type ProductDrawing = {
  src: string;
  alt: string;
  /** intrinsic pixel size, so the aspect ratio survives in the layout */
  width: number;
  height: number;
  /** one-line note under the drawing */
  caption?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  group: string;
  description: string;
  highlights: string[];
  /** "what's included" bullets on the product page */
  included?: string[];
  specs: { label: string; value: string }[];
  documents: { name: string; meta: string }[];
  status: "published" | "draft";
  kind: ProductKind;
  /** photo under /public/products */
  image?: string;
  /** intrinsic size of `image`; defaults to the 292×238 live-site thumbnails */
  imageWidth?: number;
  imageHeight?: number;
  /** attribution line for a stock photo (shown small under the image) */
  photoCredit?: string;
  /** real drawing — takes the place of the photo when present */
  drawing?: ProductDrawing;
  /** show the photo in the hero even when a drawing exists (drawing moves to the spec card) */
  photoFirst?: boolean;
  calc?: CalcConfig;
  adders?: Adder[];
  sizes: Size[];
};

export type Settings = {
  /** draft = prices not verified against a current invoice/sheet */
  priceListStatus: "draft" | "verified";
  priceListDate: string | null;
  calcRates: CalcRate[];
};

export const VAT_RATE = 0.18;
