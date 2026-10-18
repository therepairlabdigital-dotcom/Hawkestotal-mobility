import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { RouteLine } from "@/components/sections";
import { CallButtons, ContactBand, Container, PageHero, SectionIntro } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { areaPages, photos } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Service Areas: Napier & Hastings",
  description:
    "Accessible door-to-door transport across Napier, Hastings, Havelock North, Taradale, Flaxmere, Clive and wider Hawke’s Bay. Call 027 352 1635.",
  path: "/service-areas",
  image: photos.vanSide.src,
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        title="Wheelchair transport across Napier, Hastings and the Bay."
        intro={
          <p>
            We cover Napier, Hastings and the towns around them, and longer trips across Hawke’s Bay can be arranged. Not sure about your address? Call or text and
            we’ll tell you.
          </p>
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "Areas" }]}
        path="/service-areas"
        photo={photos.vanSide}
      >
        <CallButtons />
      </PageHero>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionIntro title="Where most of our trips start." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {areaPages.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-shadow hover:shadow-[var(--shadow-card)]"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={photos[a.photo].src}
                      alt=""
                      width={800}
                      height={600}
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-[22px] font-normal tracking-[-0.02em] text-ink">{a.name}</h2>
                    <p className="mt-2 flex-1 text-[16px] leading-relaxed text-muted">{a.trips.map((t) => t.title).slice(0, 3).join(" · ")}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand">
                      Transport in {a.name}
                      <Icon name="arrow" size={17} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-tint py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionIntro title="Every stop we cover, north to south.">
            <p>The towns in yellow have their own page. For anywhere else in the region, call or text and we’ll arrange it.</p>
          </SectionIntro>
          <div className="rounded-[var(--radius-card)] bg-white p-7 lg:p-9">
            <RouteLine />
          </div>
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
