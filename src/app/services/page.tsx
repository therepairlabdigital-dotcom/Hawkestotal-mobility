import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ServiceCards, TotalMobilityBand, TripSteps } from "@/components/sections";
import { CallButtons, ContactBand, Container, PageHero } from "@/components/ui";
import { photos } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Accessible Transport Services",
  description:
    "Wheelchair and mobility transport in Hawke’s Bay: medical appointments, shopping, social outings, airport transfers and local travel. Call 027 352 1635.",
  path: "/services",
  image: photos.fleetMemorial.src,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Accessible transport services in Hawke’s Bay."
        intro={
          <p>
            Door-to-door rides for people who use a wheelchair or walker, or who need a hand getting about. Every trip works the same way: we come to your door,
            help you in, and see you safely inside at the other end.
          </p>
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        path="/services"
        photo={photos.fleetMemorial}
      >
        <CallButtons />
      </PageHero>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <ServiceCards />
        </Container>
      </section>

      <TripSteps bg="bg-tint" />
      <TotalMobilityBand />
      <ContactBand title="Not sure which service you need?" intro="Tell us where you need to go and anything we should know about getting you there. We’ll sort out the rest." />
    </>
  );
}
