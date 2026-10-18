"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Icon } from "./icons";

const field =
  "mt-1.5 block w-full rounded-[10px] border border-line bg-white px-3.5 py-3 text-[16px] text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const label = "block text-[14px] text-muted";

/** Quick booking card for the home hero. Hands the trip details to the full form on /contact. */
export function HeroBooking() {
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const [k, v] of data.entries()) if (String(v).trim()) params.set(k, String(v).trim());
    router.push(`/contact?${params.toString()}#booking`);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[var(--radius-card)] bg-white p-5 text-ink shadow-[0_20px_60px_rgb(13_16_22/0.25)] sm:p-6">
      <p className="text-[20px] tracking-[-0.015em]">Book a ride</p>
      <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="hb-pickup" className={label}>
            Pickup address
          </label>
          <input id="hb-pickup" name="pickup" required autoComplete="street-address" placeholder="e.g. 12 Kennedy Rd, Napier" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="hb-destination" className={label}>
            Going to
          </label>
          <input id="hb-destination" name="destination" required placeholder="e.g. Hawke’s Bay Hospital" className={field} />
        </div>
        <div>
          <label htmlFor="hb-date" className={label}>
            Date
          </label>
          <input id="hb-date" name="date" type="date" required className={field} />
        </div>
        <div>
          <label htmlFor="hb-time" className={label}>
            Pickup time
          </label>
          <input id="hb-time" name="time" type="time" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="hb-mobility" className={label}>
            Mobility aid
          </label>
          <select id="hb-mobility" name="mobility" className={field} defaultValue="Manual wheelchair">
            <option>Manual wheelchair</option>
            <option>Power chair</option>
            <option>Walker or walking frame</option>
            <option>Walking stick</option>
            <option>None</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="group mt-5 inline-flex min-h-13 w-full items-center justify-between gap-4 rounded-full bg-brand py-2 pr-2 pl-6 text-[17px] font-medium text-white hover:bg-brand-dark"
      >
        Continue booking
        <span className="flex size-9 items-center justify-center rounded-full bg-white text-brand transition-transform group-hover:translate-x-0.5">
          <Icon name="arrow" size={16} strokeWidth={2.25} />
        </span>
      </button>
      <p className="mt-3 text-center text-[14px] text-muted">Next, add your name and number. We confirm every booking.</p>
    </form>
  );
}
