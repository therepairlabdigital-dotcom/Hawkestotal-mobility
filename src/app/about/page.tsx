import type { Metadata } from "next";
import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import { photos } from "@/lib/site";
import { Icon, type IconName } from "@/components/icons";
import { RouteLine, TotalMobilityBand } from "@/components/sections";
import { CallButtons, ContactBand, Container, PageHero, SectionIntro } from "@/components/ui";

export const metadata: Metadata = pageMeta({
  title: "About Our Local Wheelchair Transport",
  description:
    "Locally run, door-to-door wheelchair and mobility transport across Napier, Hastings and wider Hawke's Bay. Total Mobility cards welcome. Call 027 352 1635.",
  path: "/about",
  image: photos.vanMemorial.src,
});

const onEveryTrip: { icon: IconName; title: string; body: string }[] = [
  { icon: "heart", title: "We come to the door", body: "Not the kerb. We help with your coat, walker or bags, and walk you in at the other end." },
  { icon: "access", title: "Your chair is secured properly", body: "Four-point floor restraints plus a lap and sash seatbelt. You shouldn’t feel the chair move." },
  { icon: "clock", title: "Nobody rushes you", body: "We leave enough time between pickups that you can take getting in and out slowly." },
  { icon: "shield", title: "Licensed drivers", body: "NZ Transport Agency passenger (P) endorsements, which include police vetting." },
  { icon: "users", title: "Someone can come too", body: "A family member, carer or assistance dog travels with you at no extra charge." },
  { icon: "check", title: "Easy to pay", body: "EFTPOS or cash in the van. Total Mobility cards swiped on the meter. ACC billed directly." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Local wheelchair transport, run by people who know the Bay."
        intro={
          <p>
            Getting to the doctor, the shops or your family shouldn’t be a battle. We drive wheelchair-accessible vans around Napier, Hastings and the wider Bay,
            and we take the time to help you properly.
          </p>
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        path="/about"
        photo={photos.brandDoor}
      >
        <CallButtons />
      </PageHero>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionIntro title="What you can expect from us." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {onEveryTrip.map((t) => (
              <li key={t.title} className="card p-7">
                <span className="flex size-11 items-center justify-center rounded-full bg-ink/5 text-ink">
                  <Icon name={t.icon} size={24} />
                </span>
                <h3 className="mt-5 font-display text-[22px] font-normal tracking-[-0.02em] text-ink">{t.title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-muted">{t.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-tint py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Image
            src={photos.brandRamp.src}
            alt={photos.brandRamp.alt}
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover"
          />
          <div>
            <SectionIntro title="You talk to us, not a call centre.">
              <p>
                We know where the covered drop-off is at the Napier Health Centre, which hospital entrance is closest to your clinic, and where to park at the rest
                homes in Havelock North.
              </p>
              <p className="mt-4">
                If you travel with us regularly, for dialysis, physio or a weekly club, you’ll usually see the same faces, and we’ll remember how you like your
                chair set up.
              </p>
            </SectionIntro>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionIntro title="Napier, Hastings and everywhere between." />
            <div className="mt-10">
              <RouteLine />
            </div>
          </div>
          <Image
            src={photos.fleetFlag.src}
            alt={photos.fleetFlag.alt}
            width={2000}
            height={1333}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover lg:aspect-auto lg:h-full"
          />
        </Container>
      </section>

      <TotalMobilityBand />
      <ContactBand />
    </>
  );
}
