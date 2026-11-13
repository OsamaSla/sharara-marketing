import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { categoryName, cheapestSize, company, seedProducts } from "@/lib/data";
import { formatILS, priceFor, withVat } from "@/lib/pricing";

const BASE_URL = "https://sharara-metal.co.il";

export function generateStaticParams() {
  return seedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = seedProducts.find((item) => item.slug === slug);
  if (!product) return { title: "מוצר לא נמצא" };

  const cheapest = cheapestSize(product);
  const price = cheapest ? formatILS(priceFor(cheapest, "gross") ?? 0) : null;

  const title =
    product.kind === "table"
      ? `${product.name} — מידות ומחירון`
      : product.kind === "calc"
        ? `${product.name} — מחשבון הערכת מחיר`
        : `${product.name} — לפי הצעה`;

  const description =
    product.kind === "table" && price
      ? `${product.subtitle}. ${product.sizes.length} מידות, החל מ־${price} כולל מע״מ. נפח, משקל משוער ומחיר לכל מידה.`
      : `${product.subtitle}. ${product.description.slice(0, 120)}`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.subtitle,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = seedProducts.find((item) => item.slug === slug);
  if (!product) notFound();

  const priced = product.sizes
    .filter((size) => size.priceNetAgorot > 0)
    .sort((a, b) => a.priceNetAgorot - b.priceNetAgorot);

  const jsonLd =
    priced.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          brand: { "@type": "Brand", name: company.name },
          category: categoryName(product.category),
          url: `${BASE_URL}/products/${product.slug}`,
          ...(product.image ? { image: `${BASE_URL}${product.image}` } : {}),
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "ILS",
            lowPrice: Math.round(withVat(priced[0].priceNetAgorot) / 100),
            highPrice: Math.round(withVat(priced[priced.length - 1].priceNetAgorot) / 100),
            offerCount: priced.length,
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: company.name },
          },
        }
      : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductView slug={slug} />
    </>
  );
}
