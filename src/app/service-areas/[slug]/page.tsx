import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { PhoneLine, ServiceCards, TripSteps } from "@/components/sections";
import { CallButtons, ContactBand, Container, Faqs, PageHero, SectionIntro } from "@/components/ui";
import { abs, businessId, JsonLd, pageMeta } from "@/lib/seo";
import { areaPages, photos } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return areaPages.map((a) => ({ slug: a.slug }));
}

const find = (slug: string) => areaPages.find((a) => a.slug === slug);

export async function generateMetadata({ params }: PageProps<"/service-areas/[slug]">): Promise<Metadata> {
  const a = find((await params).slug);
  if (!a) return {};
  return pageMeta({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/service-areas/${a.slug}`,
    image: photos[a.photo].src,
  });
}

export default async function AreaPage({ params }: PageProps<"/service-areas/[slug]">) {
  const a = find((await params).slug);
  if (!a) notFound();
  const path = `/service-areas/${a.slug}`;
  const others = areaPages.filter((o) => o.slug !== a.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Wheelchair and mobility transport in ${a.name}`,
          serviceType: "Accessible door-to-door transport",
          url: abs(path),
          provider: { "@id": businessId },
          areaServed: { "@type": "City", name: a.name },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: a.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHero
        title={`Wheelchair transport in ${a.name}.`}
        intro={<p>{a.intro}</p>}
        crumbs={[{ label: "Home", href: "/" }, { label: "Areas", href: "/service-areas" }, { label: a.name }]}
        path={path}
        photo={photos[a.photo]}
      >
        <CallButtons />
      </PageHero>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionIntro title={`Trips we often do around ${a.name}.`} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.trips.map((t) => (
              <li key={t.title} className="card p-7">
                <span className="flex size-11 items-center justify-center rounded-full bg-ink/5 text-ink">
                  <Icon name="pin" size={22} />
                </span>
                <h3 className="mt-5 font-display text-[22px] font-normal tracking-[-0.02em] text-ink">{t.title}</h3>
                <p className="mt-2.5 text-[17px] leading-relaxed text-muted">{t.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-[var(--radius-card)] bg-navy p-7 text-[18px] leading-relaxed text-on-navy lg:p-9">
            <p className="max-w-[860px]">
              <strong className="text-white">Local knowledge. </strong>
              {a.local}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-tint py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div>
            <SectionIntro title={`${a.name} FAQs.`} />
            <div className="mt-5">
              <PhoneLine />
            </div>
          </div>
          <Faqs items={a.faqs} />
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionIntro title={`What we do in ${a.name}.`} />
          <div className="mt-10">
            <ServiceCards />
          </div>
        </Container>
      </section>

      <TripSteps bg="bg-tint" />

      <section className="bg-white pt-20 lg:pt-28">
        <Container>
          <SectionIntro title="Other areas we cover." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/service-areas/${o.slug}`}
                  className="group flex items-center gap-4 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white pr-5 transition-shadow hover:shadow-[var(--shadow-card)]"
                >
                  <Image src={photos[o.photo].src} alt="" width={240} height={240} sizes="96px" className="size-24 shrink-0 object-cover" />
                  <span className="flex-1 font-display text-[22px] font-normal tracking-[-0.02em] text-ink">{o.name}</span>
                  <Icon name="arrow" size={18} className="text-brand transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
