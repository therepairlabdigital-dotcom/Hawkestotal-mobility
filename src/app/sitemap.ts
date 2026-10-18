import type { MetadataRoute } from "next";
import { areaPages, nav, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...nav.map((n) => n.href), ...services.map((s) => `/services/${s.slug}`), ...areaPages.map((a) => `/service-areas/${a.slug}`), "/privacy"];
  const lastModified = new Date();
  return paths.map((p) => ({
    url: `${site.url}${p === "/" ? "" : p}`,
    lastModified,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p.startsWith("/services/") || p.startsWith("/service-areas/") ? 0.8 : 0.7,
  }));
}
