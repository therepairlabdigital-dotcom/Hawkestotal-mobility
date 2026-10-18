import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { Icon } from "@/components/icons";
import { Container, Faqs, PageHero, SectionIntro } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { photos, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Book a Ride or Contact Us",
  description:
    "Book accessible door-to-door transport in Hawke’s Bay. Call or text 027 352 1635, or send a booking request online.",
  path: "/contact",
  image: photos.brandParade.src,
});

const faqs = [
  { q: "How far ahead should I book?", a: "As early as you can, especially for appointments and flights. For same-day trips, call us and we’ll do our best." },
  { q: "What details do you need?", a: "Your name, pickup address, where you’re going, the date and time, whether you need a ride home, and any mobility aids you use." },
  { q: "Can I use my Total Mobility card?", a: "Yes. Mention it when you book and bring your card on the day." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Book wheelchair transport."
        intro={
          <p>
            The quickest way is to call or text{" "}
            <a href={site.phoneHref} className="font-semibold text-brand-soft hover:underline">
              {site.phoneDisplay}
            </a>
            . Or send your trip details below and we’ll confirm your pickup time.
          </p>
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        path="/contact"
        photo={photos.brandParade}
      />

      <section className="bg-tint py-20 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="rounded-[var(--radius-card)] bg-white p-6 sm:p-9">
            <BookingForm />
          </div>
          <aside className="grid gap-5">
            <div className="rounded-[var(--radius-card)] bg-navy p-7 text-white">
              <p className="flex items-center gap-2 text-[15px] font-semibold text-on-navy">
                <Icon name="phone" size={18} className="text-brand-soft" /> Call or text
              </p>
              <a href={site.phoneHref} className="mt-2 block font-display text-[34px] font-normal tracking-[-0.02em] tracking-tight text-white hover:text-brand-soft">
                {site.phoneDisplay}
              </a>
              <p className="mt-1 text-[15px] text-on-navy">{site.hours}</p>
              <a href={site.bookHref} className="mt-5 inline-flex min-h-12 items-center rounded-full bg-white px-6 font-semibold text-ink">
                Send a text
              </a>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white p-7">
              <p className="font-display text-[22px] font-normal tracking-[-0.02em] text-ink">Email</p>
              <a href={`mailto:${site.email}`} className="mt-2 block break-all text-brand hover:underline">
                {site.email}
              </a>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white p-7">
              <p className="font-display text-[22px] font-normal tracking-[-0.02em] text-ink">Out of hours</p>
              <p className="mt-2 leading-relaxed text-muted">{site.afterHours}</p>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <SectionIntro title="Before you book." />
          <Faqs items={faqs} />
        </Container>
      </section>
    </>
  );
}
