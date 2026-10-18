import Image from "next/image";
import Link from "next/link";
import { areaPages, areas, photos, services, site, steps } from "@/lib/site";
import { Icon } from "./icons";
import { Button, Container, SectionIntro } from "./ui";

/**
 * Service cards: photo on top, title, one line and "Read more", all inside one card that is the link.
 * With `exclude`, shows three other services so the row is always full.
 */
export function ServiceCards({ exclude }: { exclude?: string }) {
  const list = exclude ? services.filter((s) => s.slug !== exclude).slice(0, 3) : services;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <li key={s.slug}>
          <Link href={`/services/${s.slug}`} className="card card-link group flex h-full flex-col overflow-hidden">
            <div className="relative overflow-hidden">
              <Image
                src={photos[s.photo].src}
                alt=""
                width={1200}
                height={800}
                quality={90}
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[13px] text-ink backdrop-blur">{s.tag}</span>
            </div>
            <div className="flex flex-1 flex-col p-6 lg:p-7">
              <h3 className="text-[22px] tracking-[-0.015em] text-ink">{s.title}</h3>
              <p className="mt-2.5 flex-1 text-[17px] leading-relaxed text-muted">{s.short}</p>
              <span className="mt-6 flex items-center justify-between border-t border-line pt-5 text-[16px] text-ink">
                Read more
                <span className="flex size-9 items-center justify-center rounded-full bg-tint text-ink transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name="arrow" size={16} />
                </span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Ways to pay, shown as a quiet text strip under the hero (the equivalent of a "trusted by" logo row). */
export function PaymentStrip() {
  const names = ["Total Mobility", "ACC", "Health NZ (NTA)", "EFTPOS", "Visa & Mastercard", "Cash"];
  return (
    <div className="border-b border-line bg-paper">
      <Container className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:gap-10">
        <p className="shrink-0 text-[14px] text-muted">Ways to pay</p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 sm:border-l sm:border-line sm:pl-10">
          {names.map((n) => (
            <li key={n} className="text-[18px] tracking-[-0.01em] text-ink/55">
              {n}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

/** The three stages of a trip. These are a real sequence, so they are numbered. */
export function TripSteps({ bg = "bg-tint" }: { bg?: string }) {
  return (
    <section className={`${bg} py-20 lg:py-28`}>
      <Container>
        <SectionIntro title="How a trip works." center>
          <p>Three steps, from booking to home again.</p>
        </SectionIntro>
        <ol className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* Dashed line joining the three steps on wide screens. */}
          <span className="absolute top-[52px] right-[16%] left-[16%] hidden border-t-2 border-dashed border-brand/25 md:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.title} className="card relative flex flex-col p-7 lg:p-8">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white" aria-hidden="true">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="rounded-full bg-tint px-3 py-1 text-[14px] text-muted">Step {i + 1}</span>
              </div>
              <h3 className="mt-7 text-[22px] tracking-[-0.02em] text-ink">{s.title}</h3>
              <p className="mt-2.5 flex-1 text-[17px] leading-relaxed text-muted">{s.body}</p>
              <p className="mt-6 flex items-center gap-2.5 border-t border-line pt-5 text-[15px] text-ink">
                <Icon name="check" size={16} className="shrink-0 text-brand" />
                {s.detail}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/contact">Book a ride</Button>
          <Button href={site.phoneHref} icon="phone" variant="outline">
            Call {site.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
}

/** How a Total Mobility fare splits between the scheme and the passenger. */
export function FareSplit({ light = false }: { light?: boolean }) {
  return (
    <div>
      <div className="flex h-16 overflow-hidden text-[16px]" role="img" aria-label="The scheme pays 75 percent, you pay 25 percent">
        <div className="flex w-3/4 items-center bg-brand px-5 text-white">Scheme pays 75%</div>
        <div className={`flex w-1/4 items-center justify-center px-2 ${light ? "bg-white text-ink" : "bg-ink text-white"}`}>You 25%</div>
      </div>
      <p className={`mt-4 text-[15px] leading-relaxed ${light ? "text-on-navy" : "text-muted"}`}>
        The subsidy is capped per trip by Hawke’s Bay Regional Council. Anything over the cap is added to your share. We swipe your card on the meter, so
        the discount comes off straight away.
      </p>
    </div>
  );
}

const route = ["Bay View & Eskdale", "Napier", "Taradale", "Hastings", "Flaxmere", "Havelock North", "Clive & Haumoana", "Further afield"];

/** Service areas drawn as stops on a route line, north to south. */
export function RouteLine() {
  const stops = route.map((name) => areas.find((a) => a.name === name)!).filter(Boolean);
  return (
    <ol className="relative">
      <span className="absolute top-3 bottom-3 left-[9px] w-px bg-line" aria-hidden="true" />
      {stops.map((a) => (
        <li key={a.name} className="relative grid grid-cols-[20px_1fr] gap-5 pb-7 last:pb-0">
          <span className={`relative z-10 mt-1.5 size-[19px] rounded-full border-[5px] bg-paper ${a.slug ? "border-brand" : "border-line"}`} aria-hidden="true" />
          <div>
            <p className="text-[19px] tracking-[-0.01em] text-ink">
              {a.slug ? (
                <Link href={`/service-areas/${a.slug}`} className="hover:text-brand hover:underline hover:underline-offset-4">
                  {a.name}
                </Link>
              ) : (
                a.name
              )}
            </p>
            <p className="mt-2.5 text-[17px] leading-relaxed text-muted">{a.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Area photos in a row of tall frames with the town name on top, like a gallery. */
export function AreaGallery() {
  return (
    <ul className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pt-1 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6">
      {areaPages.map((a) => (
        <li key={a.slug} className="w-[80%] shrink-0 snap-start sm:w-auto">
          <Link href={`/service-areas/${a.slug}`} className="card card-link group flex h-full flex-col overflow-hidden">
            <div className="overflow-hidden">
              <Image
                src={photos[a.photo].src}
                alt=""
                width={900}
                height={600}
                quality={90}
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 80vw"
                className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-[22px] tracking-[-0.015em] text-ink">{a.name}</h3>
              <p className="mt-2.5 flex-1 text-[16px] leading-relaxed text-muted">{a.trips.map((t) => t.title).slice(0, 3).join(" · ")}</p>
              <span className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[16px] text-ink">
                Transport in {a.name}
                <span className="flex size-9 items-center justify-center rounded-full bg-tint transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name="arrow" size={16} />
                </span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Figures taken from the service details elsewhere on the site, not marketing estimates.
const numbers = [
  { icon: "shield", value: "75%", title: "Off every fare", label: "Total Mobility pays 75% of the fare for cardholders, up to the regional cap." },
  { icon: "access", value: "4-point", title: "Wheelchair restraints", label: "Your chair is clipped to the floor at four points, plus a lap and sash belt." },
  { icon: "users", value: "$0", title: "For a companion", label: "A carer, family member or assistance dog rides with you at no extra cost." },
] as const;

/** Full-bleed photo band, then three stat cards (the first one in solid blue). */
export function NumbersBand() {
  return (
    <section className="bg-paper">
      <div className="relative aspect-[3/2] overflow-hidden lg:aspect-[2/1]">
        <Image src={photos.brandParade.src} alt={photos.brandParade.alt} fill quality={90} sizes="100vw" className="object-cover object-[50%_60%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" aria-hidden="true" />
        <Container className="absolute inset-x-0 bottom-0 pb-10 text-center text-white lg:pb-14">
                    <p className="mt-2 text-[28px] leading-tight tracking-[-0.02em] sm:text-[40px]">Local drivers, seven days a week.</p>
        </Container>
      </div>
      <Container className="py-20 lg:py-28">
        <SectionIntro title="What riding with us means." center>
          <p>We drive wheelchair-accessible vans around Napier, Hastings and the wider Bay, seven days a week.</p>
        </SectionIntro>
        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {numbers.map((n, i) => {
            const featured = i === 0;
            return (
              <li key={n.value} className={`card flex flex-col p-7 lg:p-9 ${featured ? "border-brand bg-brand text-white" : ""}`}>
                <span
                  className={`flex size-12 items-center justify-center rounded-full ${featured ? "bg-white/15 text-white" : "bg-tint text-brand"}`}
                  aria-hidden="true"
                >
                  <Icon name={n.icon} size={22} />
                </span>
                <p className={`mt-10 text-[64px] leading-none tracking-[-0.045em] lg:text-[80px] ${featured ? "text-white" : "text-ink"}`}>{n.value}</p>
                <h3 className={`mt-5 text-[22px] tracking-[-0.015em] ${featured ? "text-white" : "text-ink"}`}>{n.title}</h3>
                <p className={`mt-2.5 text-[17px] leading-relaxed ${featured ? "text-white/80" : "text-muted"}`}>{n.label}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

const approach = [
  { icon: "heart", title: "Front door to front door", body: "We help you in at home and see you safely inside at the other end." },
  { icon: "clock", title: "Never rushed", body: "Time between pickups means nobody is hurried, and late clinics are fine." },
  { icon: "phone", title: "A local voice", body: "You talk to us, not a call centre. We know every hospital entrance." },
  { icon: "users", title: "Familiar faces", body: "Regular passengers see the same drivers, who know how you like your chair." },
] as const;

/** "Our approach": large photo on one side, heading and four icon cards on the other. */
export function ApproachBand() {
  return (
    <section className="bg-stone py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div className="relative">
          <Image
            src={photos.brandDoor.src}
            alt={photos.brandDoor.alt}
            width={1200}
            height={800}
            quality={90}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[3/2] w-full rounded-[18px] object-cover lg:aspect-[4/5]"
          />
          <div className="card absolute right-4 bottom-4 left-4 flex items-center gap-4 p-4 sm:right-auto sm:max-w-[340px]">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white" aria-hidden="true">
              <Icon name="phone" size={20} />
            </span>
            <div>
              <p className="text-[14px] text-muted">Talk to a real person</p>
              <a href={site.phoneHref} className="text-[20px] tracking-[-0.01em] text-ink hover:text-brand">
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
        <div>
          <SectionIntro title="Our approach.">
            <p>Getting to the doctor, the shops or your family shouldn’t be a battle. Here’s how we make it easy.</p>
          </SectionIntro>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {approach.map((a) => (
              <li key={a.title} className="card flex flex-col p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-tint text-brand" aria-hidden="true">
                  <Icon name={a.icon} size={20} />
                </span>
                <h3 className="mt-5 text-[19px] tracking-[-0.015em] text-ink">{a.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">{a.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/about" variant="dark">
              More about us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

const credentials = [
  { icon: "shield", title: "Total Mobility approved", body: "Approved provider for Hawke’s Bay Regional Council’s scheme. Cards swiped on the meter." },
  { icon: "user", title: "NZTA licensed drivers", body: "Every driver holds a passenger (P) endorsement, which includes police vetting." },
  { icon: "check", title: "ACC approved", body: "Approved ACC transport billed directly with your claim number." },
  { icon: "heart", title: "Health NZ vouchers", body: "National Travel Assistance vouchers accepted for specialist appointments." },
  { icon: "access", title: "Wheelchair safe", body: "Four-point floor restraints and a lap and sash belt on every wheelchair trip." },
] as const;

/** Dark band: heading in the first cell, five credential cards filling the rest of a 3-column grid. */
export function CredentialsBand() {
  return (
    <section className="bg-navy py-20 text-white lg:py-28">
      <Container>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li className="flex flex-col justify-center pb-4 sm:col-span-2 lg:col-span-1 lg:pr-6 lg:pb-0">
            <h2 className="text-[32px] leading-[1.08] tracking-[-0.025em] sm:text-[40px] lg:text-[44px]">Licensed, approved and set up for wheelchairs.</h2>
            <p className="mt-5 text-[18px] leading-relaxed text-on-navy">The paperwork that matters when someone you care about is in the back of the van.</p>
          </li>
          {credentials.map((c) => (
            <li key={c.title} className="flex flex-col rounded-[18px] border border-white/10 bg-navy-2 p-7">
              <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white" aria-hidden="true">
                <Icon name={c.icon} size={22} />
              </span>
              <h3 className="mt-6 text-[22px] tracking-[-0.015em]">{c.title}</h3>
              <p className="mt-2.5 text-[16px] leading-relaxed text-on-navy">{c.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Total Mobility: one large card with the explanation on the left and the fare split on the right. */
export function TotalMobilityBand() {
  const ways = ["EFTPOS", "Credit card", "Cash", "ACC", "Health NZ"];
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="card grid gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-1.5 text-[14px] text-ink">
              <Icon name="shield" size={16} className="text-brand" /> Approved Total Mobility provider
            </span>
            <h2 className="mt-6 text-[32px] leading-[1.05] tracking-[-0.025em] text-ink sm:text-[40px] lg:text-[44px]">Your card takes 75% off the fare.</h2>
            <p className="mt-5 max-w-[520px] text-[18px] leading-relaxed text-ink/80">
              Mention your card when you book and show it in the van. We swipe it on the meter, so the discount comes off straight away, and you pay the rest by
              EFTPOS or cash.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/total-mobility">How the scheme works</Button>
              <Button href="/contact" variant="outline">
                Book with your card
              </Button>
            </div>
          </div>
          <div className="rounded-[14px] bg-tint p-6 sm:p-8">
            <p className="text-[15px] text-muted">How a fare is split</p>
            <div className="mt-4 flex h-14 overflow-hidden rounded-[10px] text-[16px]" role="img" aria-label="The scheme pays 75 percent, you pay 25 percent">
              <div className="flex w-3/4 items-center bg-brand px-5 text-white">75%</div>
              <div className="flex w-1/4 items-center justify-center bg-ink text-white">25%</div>
            </div>
            <dl className="mt-6 divide-y divide-line">
              <div className="flex items-center justify-between py-4">
                <dt className="flex items-center gap-3 text-[17px] text-ink">
                  <span className="size-3 rounded-full bg-brand" aria-hidden="true" /> Total Mobility pays
                </dt>
                <dd className="text-[22px] tracking-[-0.02em] text-ink">75%</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="flex items-center gap-3 text-[17px] text-ink">
                  <span className="size-3 rounded-full bg-ink" aria-hidden="true" /> You pay
                </dt>
                <dd className="text-[22px] tracking-[-0.02em] text-ink">25%</dd>
              </div>
            </dl>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">Capped per trip by Hawke’s Bay Regional Council. Anything over the cap is added to your share.</p>
            <p className="mt-6 text-[15px] text-muted">Ways to pay your share</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ways.map((w) => (
                <li key={w} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[14px] text-ink">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PhoneLine() {
  return (
    <p className="text-[17px] text-muted">
      Still have a question? Call or text{" "}
      <a href={site.phoneHref} className="text-brand hover:underline">
        {site.phoneDisplay}
      </a>
      .
    </p>
  );
}
