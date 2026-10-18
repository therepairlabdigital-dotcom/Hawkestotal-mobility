import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { businessId, JsonLd } from "@/lib/seo";
import { services, site } from "@/lib/site";
import "./globals.css";

// One family for everything, like a print identity. Regular weight for headings, medium for UI.
const display = localFont({
  src: "../../public/fonts/geist-variable.woff2",
  variable: "--font-display-face",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Hawke’s Bay Total Mobility | Wheelchair & Mobility Transport",
    template: "%s | Hawke’s Bay Total Mobility",
  },
  description:
    "Door-to-door wheelchair and mobility transport across Napier, Hastings and Hawke’s Bay — medical appointments, errands, social outings and airport transfers. Call 027 352 1635.",
  applicationName: site.name,
  formatDetection: { telephone: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": businessId,
  name: site.name,
  description: "Door-to-door wheelchair and mobility transport across Hawke’s Bay.",
  url: site.url,
  telephone: "+64 27 352 1635",
  image: [`${site.url}/images/photos/van-marine-parade-apartments.jpg`, `${site.url}/images/photos/van-war-memorial-centre.jpg`],
  logo: `${site.url}/images/logo-full.png`,
  slogan: "Honest Reliable Service",
  address: { "@type": "PostalAddress", addressRegion: "Hawke’s Bay", addressCountry: "NZ" },
  areaServed: [
    ...["Napier", "Hastings", "Havelock North", "Taradale"].map((name) => ({ "@type": "City", name })),
    { "@type": "AdministrativeArea", name: "Hawke’s Bay" },
  ],
  email: site.email,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:00",
    closes: "19:00",
  },
  paymentAccepted: "Cash, EFTPOS, Credit Card, Total Mobility card, ACC",
  currenciesAccepted: "NZD",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+64 27 352 1635",
    contactType: "reservations",
    areaServed: "NZ",
    availableLanguage: "English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Accessible transport services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` },
    })),
  },
  knowsAbout: ["Wheelchair transport", "Accessible transport", "Total Mobility scheme", "Medical appointment transport"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NZ" className={`${display.variable} antialiased`}>
      <body className="pb-[76px] font-sans lg:pb-0">
        <JsonLd data={jsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-navy focus:text-white focus:px-5 focus:py-3 focus:font-bold focus:shadow-2xl focus:ring-4 focus:ring-brand focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="pt-[108px]">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
