import type { Metadata } from "next";
import { FareSplit } from "@/components/sections";
import { CallButtons, ContactBand, Container, Faqs, PageHero, SectionIntro } from "@/components/ui";
import { JsonLd, pageMeta } from "@/lib/seo";
import { photos } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Total Mobility Card Transport",
  description:
    "How the Total Mobility scheme works in Hawke’s Bay, who is eligible, and how to use your Total Mobility card with Hawke’s Bay Total Mobility. Call 027 352 1635.",
  path: "/total-mobility",
  image: photos.companionRide.src,
});

const steps = [
  { title: "Tell us when you book", body: "Call or text and mention you’re a Total Mobility cardholder." },
  { title: "Bring your card", body: "Show it to the driver at the start of the trip. We swipe it on the meter." },
  { title: "Pay your share", body: "The scheme pays 75% of the fare, up to the regional cap. You pay the rest by EFTPOS or cash." },
];

const payments = [
  { title: "EFTPOS and cards", body: "Pay your share in the van by EFTPOS, contactless debit or credit card." },
  { title: "Cash", body: "Cash is always fine. Pay the driver directly." },
  { title: "ACC", body: "Recovering from an accident or surgery? We bill ACC directly with your approved claim number." },
  { title: "Health NZ travel vouchers", body: "Approved National Travel Assistance (NTA) vouchers for specialist and outpatient appointments." },
];

const faqs = [
  {
    q: "What is Total Mobility?",
    a: "Total Mobility is a government-funded scheme that helps people with long-term impairments get around, by paying part of the cost of trips with approved transport providers.",
  },
  {
    q: "Who can get a card?",
    a: "People with a long-term impairment that stops them using public transport safely or on their own. Eligibility is decided by an assessment with an approved agency.",
  },
  {
    q: "How do I apply?",
    a: "Contact an approved assessment agency in Hawke’s Bay, such as Age Concern, the Disability Resource Centre or Blind Low Vision NZ. Hawke’s Bay Regional Council runs the scheme locally and can point you to one.",
  },
  {
    q: "How much is the discount?",
    a: "In Hawke’s Bay the scheme pays 75% of your fare, up to the regional maximum per trip. You pay the remaining 25%, plus anything over the cap.",
  },
  { q: "Can I use my card if I travel in my wheelchair?", a: "Yes. You stay in your own chair, and the trip is subsidised just the same." },
  {
    q: "Do you accept ACC or Health NZ travel vouchers?",
    a: "Yes. We accept approved ACC transport claims and Health NZ (Te Whatu Ora) National Travel Assistance vouchers.",
  },
];

export default function TotalMobilityPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <PageHero
        title="Total Mobility card transport in Hawke’s Bay."
        intro={
          <p>
            We’re an approved provider for Hawke’s Bay Regional Council’s Total Mobility scheme. With a card, the scheme pays 75% of your fare, up to the regional
            cap.
          </p>
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "Total Mobility" }]}
        path="/total-mobility"
        photo={photos.companionRide}
      >
        <CallButtons />
      </PageHero>

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_480px] lg:items-start lg:gap-16">
          <div>
            <SectionIntro title="Three steps with us." />
            <ol className="mt-10 space-y-5">
              {steps.map((s, i) => (
                <li key={s.title} className="card flex gap-5 p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[17px] text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[22px] font-normal tracking-[-0.02em] text-ink">{s.title}</h3>
                    <p className="mt-2.5 text-[17px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[20px] bg-navy p-3 lg:mt-24">
            <FareSplit />
          </div>
        </Container>
      </section>

      <section className="bg-tint py-20 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-white p-7 lg:p-9">
            <SectionIntro title="Who the scheme is for.">
              <p>
                Total Mobility is for people with a permanent or long-term impairment that makes it hard to use the bus safely on their own. That can be a physical,
                sensory, neurological or age-related condition.
              </p>
              <p className="mt-4">
                Cards are issued after an assessment with an approved local agency. Hawke’s Bay Regional Council runs the scheme across Napier and Hastings.
              </p>
            </SectionIntro>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-7 lg:p-9">
            <SectionIntro title="Ways to pay your share." />
            <dl className="mt-6 divide-y divide-line">
              {payments.map((p) => (
                <div key={p.title} className="py-4 first:pt-0 last:pb-0">
                  <dt className="font-semibold text-ink">{p.title}</dt>
                  <dd className="mt-1 text-[17px] leading-relaxed text-muted">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <SectionIntro title="About the scheme." />
          <Faqs items={faqs} />
        </Container>
      </section>

      <ContactBand title="Ready to book?" intro="Call or text us, mention your Total Mobility card, and tell us where you need to go." />
    </>
  );
}
