"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { areaPages, photos, services, site } from "@/lib/site";
import { Icon } from "./icons";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name}, home`}>
      <span className="shrink-0 rounded-lg bg-white p-0.5">
        <Image src="/images/logo-emblem.png" alt="" width={454} height={311} loading="eager" className="h-8 w-auto max-w-none" />
      </span>
      <span className={`font-display text-[15px] leading-none tracking-[-0.01em] whitespace-nowrap sm:text-[17px] ${light ? "text-white" : "text-ink"}`}>
        Hawke’s Bay Total Mobility
      </span>
    </Link>
  );
}

type MenuKey = "services" | "areas";

const directLinks = [
  { label: "Total Mobility", href: "/total-mobility" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything when the route changes (reset during render, per React's guidance).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(key);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setMenu(null), 150);
  };

  // On the home page the bar is transparent over the hero until the visitor scrolls or opens a menu.
  const overHero = pathname === "/" && !scrolled && !mobileOpen && !menu;
  const linkTone = overHero ? "text-white/90 hover:text-white" : "text-ink/75 hover:text-ink";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-10 items-center justify-center bg-brand px-4 text-[14px] text-white">
        <span className="truncate">Total Mobility cardholders save 75% on every fare</span>
        <Link href="/total-mobility" className="ml-3 hidden shrink-0 items-center gap-1 text-white/75 hover:text-white sm:inline-flex">
          How it works <Icon name="arrow" size={14} />
        </Link>
      </div>

      <div className={`relative transition-colors duration-300 ${overHero ? "bg-transparent" : "border-b border-line bg-paper/95 backdrop-blur"}`}>
        <div className="mx-auto grid h-[68px] max-w-[1440px] grid-cols-[1fr_auto] items-center gap-6 px-5 sm:px-6 lg:px-8 xl:grid-cols-[1fr_auto_1fr]">
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {(["services", "areas"] as const).map((key) => {
                const href = key === "services" ? "/services" : "/service-areas";
                const active = menu === key || isActive(href);
                return (
                  <li key={key} onMouseEnter={() => openMenu(key)} onMouseLeave={closeSoon}>
                    <button
                      type="button"
                      aria-expanded={menu === key}
                      aria-controls={`menu-${key}`}
                      onClick={() => setMenu(menu === key ? null : key)}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[15px] whitespace-nowrap transition-colors ${
                        active ? (overHero ? "text-white" : "bg-tint text-ink") : linkTone
                      }`}
                    >
                      {key === "services" ? "Services" : "Areas"}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${menu === key ? "rotate-180" : ""}`} aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </li>
                );
              })}
              {directLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`block rounded-full px-3.5 py-2 text-[15px] whitespace-nowrap transition-colors ${isActive(l.href) && !overHero ? "bg-tint text-ink" : linkTone}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="xl:justify-self-center">
            <Logo light={overHero} />
          </div>

          <div className="flex items-center justify-end gap-5">
            <a href={site.phoneHref} className={`hidden items-center gap-2 text-[15px] whitespace-nowrap 2xl:flex ${linkTone}`}>
              <Icon name="phone" size={16} />
              {site.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className={`group hidden min-h-11 items-center gap-3 rounded-full py-1.5 pr-1.5 pl-5 text-[15px] font-medium whitespace-nowrap transition-colors sm:inline-flex ${
                overHero ? "bg-white text-ink" : "bg-brand text-white hover:bg-brand-dark"
              }`}
            >
              Book a ride
              <span className={`flex size-8 items-center justify-center rounded-full ${overHero ? "bg-ink text-white" : "bg-white text-brand"}`}>
                <Icon name="arrow" size={15} strokeWidth={2.25} />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] font-medium xl:hidden ${
                overHero ? "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur" : "text-ink ring-1 ring-line"
              }`}
            >
              <Icon name={mobileOpen ? "close" : "menu"} size={18} />
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Desktop dropdown panels */}
        {menu && (
          <div
            id={`menu-${menu}`}
            onMouseEnter={() => openMenu(menu)}
            onMouseLeave={closeSoon}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-paper shadow-[0_24px_48px_rgb(13_16_22/0.08)] xl:block"
          >
            <div className="mx-auto grid max-w-[1440px] gap-8 px-8 py-8 lg:grid-cols-[1fr_320px]">
              {menu === "services" ? (
                <ul className="grid grid-cols-3 gap-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group flex gap-4 rounded-[14px] p-3 transition-colors hover:bg-white">
                        <Image src={photos[s.photo].src} alt="" width={160} height={107} sizes="96px" className="aspect-[3/2] w-24 shrink-0 rounded-[10px] object-cover" />
                        <span>
                          <span className="block text-[16px] text-ink group-hover:text-brand">{s.title}</span>
                          <span className="mt-1 block text-[14px] leading-snug text-muted">{s.short}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-4 gap-2">
                  {areaPages.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/service-areas/${a.slug}`} className="group block rounded-[14px] p-3 transition-colors hover:bg-white">
                        <Image src={photos[a.photo].src} alt="" width={300} height={200} sizes="240px" className="aspect-[3/2] w-full rounded-[10px] object-cover" />
                        <span className="mt-3 block text-[16px] text-ink group-hover:text-brand">{a.name}</span>
                        <span className="mt-1 block text-[14px] leading-snug text-muted">{a.trips[0].title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div className="card flex flex-col justify-between p-6">
                <div>
                  <p className="text-[18px] tracking-[-0.01em] text-ink">{menu === "services" ? "Not sure which service?" : "Not sure if we cover you?"}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">Call or text and tell us where you need to go. Phones answered 7am–7pm, every day.</p>
                </div>
                <div className="mt-6 space-y-3">
                  <a href={site.phoneHref} className="flex items-center gap-2 text-[22px] tracking-[-0.01em] text-ink hover:text-brand">
                    <Icon name="phone" size={20} /> {site.phoneDisplay}
                  </a>
                  <Link href={menu === "services" ? "/services" : "/service-areas"} className="inline-flex items-center gap-1.5 text-[15px] text-brand hover:underline">
                    {menu === "services" ? "All services" : "Every area we cover"} <Icon name="arrow" size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100dvh-108px)] overflow-y-auto border-b border-line bg-paper px-5 pt-2 pb-8 sm:px-6 lg:px-8 xl:hidden">
          <MobileGroup title="Services" href="/services" links={services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
          <MobileGroup title="Areas" href="/service-areas" links={areaPages.map((a) => ({ label: a.name, href: `/service-areas/${a.slug}` }))} />
          <ul className="border-t border-line">
            {[{ label: "Home", href: "/" }, ...directLinks].map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className="flex items-center justify-between border-b border-line py-4 text-[19px] text-ink">
                  {l.label}
                  <Icon name="arrow" size={16} className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <a href={site.phoneHref} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-brand text-[17px] text-white">
              <Icon name="phone" size={18} /> Call {site.phoneDisplay}
            </a>
            <Link href="/contact" className="inline-flex min-h-13 items-center justify-center rounded-full text-[17px] text-ink ring-1 ring-ink/20">
              Book online
            </Link>
          </div>
          <p className="mt-4 text-center text-[14px] text-muted">{site.hours}</p>
        </nav>
      )}
    </header>
  );
}

function MobileGroup({ title, href, links }: { title: string; href: string; links: { label: string; href: string }[] }) {
  return (
    <details className="group border-t border-line first:border-t-0">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[19px] text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className="text-muted transition-transform group-open:rotate-180" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <ul className="mb-4 grid gap-1 rounded-[14px] bg-white p-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block rounded-[10px] px-3 py-2.5 text-[16px] text-ink hover:bg-tint">
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href={href} className="block rounded-[10px] px-3 py-2.5 text-[16px] text-brand hover:bg-tint">
            View all {title.toLowerCase()}
          </Link>
        </li>
      </ul>
    </details>
  );
}
