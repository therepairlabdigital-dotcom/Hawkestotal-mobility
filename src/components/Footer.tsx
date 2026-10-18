import Link from "next/link";
import { areaPages, nav, services, site } from "@/lib/site";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="bg-brand pt-14 pb-8 text-white lg:pt-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterCol title="Services" links={services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
          <FooterCol title="Areas" links={areaPages.map((a) => ({ label: a.name, href: `/service-areas/${a.slug}` }))} />
          <FooterCol title="Company" links={nav.filter((n) => n.href !== "/")} />
          <div>
            <p className="text-[15px] text-white/75">Bookings</p>
            <a href={site.phoneHref} className="mt-4 block text-[26px] leading-none tracking-[-0.02em] hover:underline">
              {site.phoneDisplay}
            </a>
            <p className="mt-2 text-[15px] text-white/75">{site.hours}</p>
            <a href={`mailto:${site.email}`} className="mt-3 block text-[15px] break-all hover:underline">
              {site.email}
            </a>
          </div>
        </div>
        <p className="mt-20 font-display text-[clamp(30px,6.2vw,100px)] whitespace-nowrap leading-none tracking-[-0.04em] text-white" aria-hidden="true">
          Hawke’s Bay Total Mobility
        </p>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/20 pt-6 text-[14px] sm:flex-row sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:underline">
              Privacy policy
            </Link>
            <span className="text-white/70">Approved Total Mobility provider</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/70">
            <span>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </span>
            <span>
              Designed and managed by{" "}
              <a href="https://kiwitechlabs.com" target="_blank" rel="noopener" className="text-white underline-offset-4 hover:underline">
                kiwitechlabs.com
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-[15px] text-white/75">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] hover:underline hover:underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
