import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbLd, JsonLd } from "@/lib/seo";
import { photos, site } from "@/lib/site";
import { Icon, type IconName } from "./icons";

const variants = {
  primary: { pill: "bg-brand text-white hover:bg-brand-dark", dot: "bg-white text-brand" },
  white: { pill: "bg-white text-ink hover:bg-tint", dot: "bg-ink text-white" },
  dark: { pill: "bg-navy text-white hover:bg-navy-2", dot: "bg-white text-ink" },
  outline: { pill: "bg-transparent text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/50", dot: "bg-ink text-white" },
};

/** Pill button with a round arrow (or icon) at the end. Tap target stays at least 52px tall. */
export function Button({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  icon?: IconName;
  className?: string;
}) {
  const v = variants[variant];
  const cls = `group inline-flex min-h-13 items-center justify-between gap-4 rounded-full py-2 pr-2 pl-6 text-[17px] font-medium transition-colors ${v.pill} ${className}`;
  const inner = (
    <>
      {children}
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 ${v.dot}`}>
        <Icon name={icon} size={16} strokeWidth={2.25} />
      </span>
    </>
  );
  // tel:/sms: links must stay plain anchors; internal routes get client navigation.
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

/** Text link with a hooked arrow, as in "↳ Read more". */
export function MoreLink({ href, children = "Read more", light = false }: { href: string; children?: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-1.5 text-[16px] ${light ? "text-white hover:text-signal" : "text-ink hover:text-brand"}`}>
      <span aria-hidden="true">↳</span>
      <span className="underline-offset-4 hover:underline">{children}</span>
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Heading({
  children,
  as: H = "h2",
  light = false,
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  light?: boolean;
  className?: string;
}) {
  const size =
    H === "h1"
      ? "text-[40px] leading-[1.02] sm:text-[52px] lg:text-[60px]"
      : H === "h2"
        ? "text-[32px] leading-[1.05] sm:text-[40px] lg:text-[44px]"
        : "text-[22px] leading-tight";
  return <H className={`font-display font-normal tracking-[-0.025em] ${light ? "text-white" : "text-ink"} ${size} ${className}`}>{children}</H>;
}

export function SectionIntro({
  title,
  children,
  light = false,
  center = false,
  className = "",
}: {
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-[640px] ${center ? "mx-auto text-center" : ""} ${className}`}>
      <Heading light={light}>{title}</Heading>
      {children && <div className={`mt-5 text-[18px] leading-relaxed ${light ? "text-on-navy" : "text-ink/80"}`}>{children}</div>}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[15px] text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-ink hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type Photo = { src: string; alt: string; caption?: string };

/** Inner-page header: big regular-weight title on paper, square-cornered photo alongside. */
export function PageHero({
  title,
  intro,
  crumbs,
  path,
  photo,
  children,
}: {
  title: ReactNode;
  intro: ReactNode;
  crumbs: { label: string; href?: string }[];
  /** This page's path — used for the BreadcrumbList structured data. */
  path: string;
  photo?: Photo;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <JsonLd data={breadcrumbLd(crumbs, path)} />
      <Container className={`grid gap-10 py-12 lg:py-20 ${photo ? "lg:grid-cols-2 lg:items-end lg:gap-16" : ""}`}>
        <div className={photo ? "" : "max-w-[820px]"}>
          <Breadcrumbs items={crumbs} />
          <Heading as="h1" className="mt-8">
            {title}
          </Heading>
          <div className="mt-6 max-w-[560px] text-[18px] leading-relaxed text-ink/80 sm:text-[19px]">{intro}</div>
          {children && <div className="mt-9">{children}</div>}
        </div>
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={2000}
            height={1333}
            loading="eager"
            fetchPriority="high"
            quality={90}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[3/2] w-full rounded-[18px] object-cover"
          />
        )}
      </Container>
    </section>
  );
}

export function CallButtons({ className = "" }: { className?: string; onNavy?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Button href={site.phoneHref} icon="phone">
        Call {site.phoneDisplay}
      </Button>
      <Button href="/contact" variant="outline">
        Book online
      </Button>
    </div>
  );
}

export function Faqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[19px] text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink transition-transform group-open:rotate-45" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="max-w-[680px] pb-7 text-[17px] leading-relaxed text-ink/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Closing call-to-action: a solid blue card with the dawn photo on the right. */
export function ContactBand({
  title = "Need a ride? We’re a phone call away.",
  intro = "Call or text with where you’re going and when. Let us know if you use a wheelchair or walker, and we’ll send the right vehicle.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container className="max-w-[1200px]">
        <div className="grid overflow-hidden rounded-[var(--radius-card)] bg-brand p-3 text-white lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 p-5 sm:p-8 lg:p-10">
            <div>
              <h2 className="font-display text-[32px] leading-[1.08] font-normal tracking-[-0.025em] sm:text-[40px]">{title}</h2>
              <p className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-white/85">{intro}</p>
            </div>
            <div>
              <a href={site.phoneHref} className="block font-display text-[36px] leading-none tracking-[-0.02em] hover:underline sm:text-[44px]">
                {site.phoneDisplay}
              </a>
              <p className="mt-2 text-[15px] text-white/75">Call or text, 7am–7pm, 7 days</p>
              <div className="mt-7">
                <Button href="/contact" variant="white">
                  Send a booking request
                </Button>
              </div>
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[8px] bg-navy lg:min-h-[480px]">
            <Image src={photos.seasideBench.src} alt="" fill sizes="(min-width: 1024px) 590px, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
