import Link from "next/link";
import { HeroBooking } from "@/components/HeroBooking";
import { HeroVideo } from "@/components/HeroVideo";
import { Icon } from "@/components/icons";
import {
  ApproachBand,
  AreaGallery,
  CredentialsBand,
  NumbersBand,
  PaymentStrip,
  ServiceCards,
  TotalMobilityBand,
  TripSteps,
} from "@/components/sections";
import { Button, ContactBand, Container, SectionIntro } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { photos, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Wheelchair Transport Hawke’s Bay | Hawke’s Bay Total Mobility",
  description:
    "Door-to-door wheelchair and mobility transport in Napier, Hastings and Hawke’s Bay — appointments, shopping, outings and airport trips. Call 027 352 1635.",
  path: "/",
  absoluteTitle: true,
  image: photos.brandParade.src,
});

export default function Home() {
  return (
    <>
      {/* Hero: full-bleed photo with slow camera motion, headline and phone on the left, quick booking card on the right. */}
      <section className="relative isolate -mt-[108px] overflow-hidden bg-navy text-white">
        <HeroVideo src="/videos/hero-napier.mp4" poster={photos.heroNapier.src} />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(13_16_22/0.55)_0%,rgb(13_16_22/0.25)_40%,rgb(13_16_22/0.7)_100%)] lg:bg-[linear-gradient(90deg,rgb(13_16_22/0.75)_0%,rgb(13_16_22/0.35)_55%,rgb(13_16_22/0.2)_100%)]"
          aria-hidden="true"
        />
        <Container className="grid gap-10 pt-[148px] pb-14 lg:min-h-[min(860px,100svh)] lg:grid-cols-[1fr_440px] lg:items-end lg:gap-16 lg:pt-[180px] lg:pb-20">
          <div className="max-w-[680px]">
            <p className="rise text-[16px] text-white/80">Wheelchair-accessible transport · Napier, Hastings & Hawke’s Bay</p>
            <h1 className="rise mt-5 text-[44px] leading-[1.02] tracking-[-0.035em] [animation-delay:80ms] sm:text-[60px] lg:text-[72px]">
              Door-to-door wheelchair transport in Hawke’s Bay.
            </h1>
            <p className="rise mt-6 max-w-[520px] text-[18px] leading-relaxed text-white/85 [animation-delay:140ms] sm:text-[19px]">
              We pick you up at your front door, help you in, and see you safely inside at the other end. Total Mobility cards welcome.
            </p>
            <div className="rise mt-9 [animation-delay:200ms]">
              <p className="text-[15px] text-white/75">Call or text, 7am–7pm every day</p>
              <a href={site.phoneHref} className="mt-1 inline-flex items-center gap-3 text-[36px] leading-none tracking-[-0.02em] hover:underline sm:text-[44px]">
                <Icon name="phone" size={30} />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="rise [animation-delay:280ms]">
            <HeroBooking />
          </div>
        </Container>
      </section>

      <PaymentStrip />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <SectionIntro title="Wherever you need to go." center>
            <p>Most trips are to appointments, but we’ll take you anywhere around the Bay. Every trip is door to door.</p>
          </SectionIntro>
          <div className="mt-16">
            <ServiceCards />
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="max-w-[520px] text-[17px] text-ink/80">Not sure which service fits? Call or text and tell us where you need to go.</p>
            <Button href={site.phoneHref} icon="phone" variant="outline">
              Call {site.phoneDisplay}
            </Button>
          </div>
        </Container>
      </section>

      <NumbersBand />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <SectionIntro title={<>Every town. Every trip.</>} center>
            <p>From Bay View to Havelock North, we pick you up at your door and drop you where you need to be.</p>
          </SectionIntro>
          <div className="mt-16">
            <AreaGallery />
          </div>
          <p className="mt-12 text-center">
            <Link href="/service-areas" className="inline-flex items-center gap-2 text-[16px] text-ink hover:text-brand hover:underline">
              See every area we cover <Icon name="arrow" size={16} />
            </Link>
          </p>
        </Container>
      </section>

      <TripSteps />

      <ApproachBand />

      <CredentialsBand />

      <TotalMobilityBand />

      <ContactBand />
    </>
  );
}
