import type { Metadata } from "next";
import { site } from "./site";

/**
 * One place for per-page SEO: canonical URL, Open Graph and Twitter card.
 * Child `openGraph` objects replace the root one entirely in Next, so every
 * page builds the full set here instead of relying on inheritance.
 */
export function pageMeta({
  title,
  description,
  path,
  image = "/images/brand/van-parade.jpg",
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_NZ",
      type: "website",
      images: [{ url: image, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [image] },
  };
}

export const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export const businessId = `${site.url}/#business`;

export function breadcrumbLd(items: { label: string; href?: string }[], currentPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: abs(c.href ?? currentPath),
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
