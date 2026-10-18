import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { PhoneLine, ServiceCards, TotalMobilityBand } from "@/components/sections";
import { CallButtons, ContactBand, Container, Faqs, Heading, PageHero, SectionIntro } from "@/components/ui";
import { abs, businessId, JsonLd, pageMeta } from "@/lib/seo";
import { photos, services } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const find = (slug: string) => services.find((s) => s.slug === slug);

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = find((await params).slug);
  if (!s) return {};
  return pageMeta({
    title: s.seoTitle,
    description: s.metaDescription,
    path: `/services/${s.slug}`,
    image: photos[s.photo].src,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = find((await params).slug);
  if (!s) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.metaDescription,
          serviceType: "Accessible door-to-door transport",
          url: abs(`/services/${s.slug}`),
          image: abs(photos[s.photo].src),
          provider: { "@id": businessId },
          areaServed: { "@type": "AdministrativeArea", name: "Hawke’s Bay" },
        }}
      />
      <PageHero
        title={s.title}
        intro={<p>{s.intro}</p>}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.title }]}
        path={`/services/${s.slug}`}
        photo={photos[s.photo]}
      >
        <CallButtons />
      </PageHero>

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="card p-7 lg:p-9">
            <Heading as="h2" className="!text-[28px]">
              What’s included
            </Heading>
            <ul className="mt-6 space-y-4">
              {s.includes.map((i) => (
                <li key={i} className="flex gap-3.5 text-[17px] leading-relaxed">
                  <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] bg-tint p-7 lg:p-9">
            <Heading as="h2" className="!text-[28px]">
              Good for
            </Heading>
            <ul className="mt-6 space-y-4">
              {s.goodFor.map((i) => (
                <li key={i} className="border-b border-line pb-4 text-[17px] leading-relaxed last:border-0 last:pb-0">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {s.specs && (
        <section className="bg-white pb-20 lg:pb-28">
          <Container>
            <SectionIntro title="What’s in the van." />
            <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {s.specs.map((spec) => (
                <div key={spec.label} className="bg-white p-6">
                  <dt className="text-[15px] font-semibold text-muted">{spec.label}</dt>
                  <dd className="mt-2 font-display text-[19px] leading-snug font-normal tracking-[-0.01em] text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      <section className="bg-tint py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div>
            <SectionIntro title="Good to know." />
            <div className="mt-5">
              <PhoneLine />
            </div>
          </div>
          <Faqs items={s.faqs} />
        </Container>
      </section>

      <TotalMobilityBand />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionIntro title="Other trips we do." />
          <div className="mt-10">
            <ServiceCards exclude={s.slug} />
          </div>
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
