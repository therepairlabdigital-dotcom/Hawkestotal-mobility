"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const field =
  "mt-2 block w-full rounded-[10px] border border-line bg-white px-4 py-3.5 text-[17px] text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/25";
const label = "block font-semibold text-ink";

/** The form doesn't post anywhere: it builds a message and opens the visitor's own SMS or email app. */
export function BookingForm() {
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Trip details started in the home-page booking card arrive as query parameters.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    let filled = false;
    for (const key of ["pickup", "destination", "date", "time", "mobility"]) {
      const value = params.get(key);
      const el = form.elements.namedItem(key);
      if (value && (el instanceof HTMLInputElement || el instanceof HTMLSelectElement)) {
        el.value = value;
        filled = true;
      }
    }
    if (filled) form.querySelector<HTMLInputElement>("#booking-name")?.focus();
  }, []);

  function buildSummary(form: HTMLFormElement): string {
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    return [
      "Booking request – Hawke’s Bay Total Mobility",
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `Date: ${get("date")}${get("time") ? ` at ${get("time")}` : ""}`,
      `Pickup: ${get("pickup")}`,
      `Going to: ${get("destination")}`,
      `Return trip: ${get("return")}`,
      `Mobility aid: ${get("mobility")}`,
      `Paying by: ${get("funding")}`,
      get("notes") ? `Notes: ${get("notes")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function handleSms(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = buildSummary(e.currentTarget);
    setSummary(body);
    window.location.href = `sms:${site.smsNumber}?&body=${encodeURIComponent(body)}`;
  }

  function handleEmail(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.closest("form");
    if (!form || !form.reportValidity()) return;
    const body = buildSummary(form);
    setSummary(body);
    const subject = encodeURIComponent("Booking request");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  function handleCopy() {
    if (!summary) return;
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  }

  return (
    <form ref={formRef} id="booking" onSubmit={handleSms} className="scroll-mt-32">
      <h2 className="font-display text-[28px] font-normal tracking-[-0.02em] text-ink">Booking request</h2>
      <p className="mt-2 text-[17px] text-muted">Fields marked * are needed. Everything else helps us plan.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className={label}>
            Passenger’s name *
          </label>
          <input id="booking-name" name="name" required autoComplete="name" className={field} />
        </div>

        <div>
          <label htmlFor="booking-phone" className={label}>
            Phone number *
          </label>
          <input id="booking-phone" name="phone" type="tel" required autoComplete="tel" className={field} />
        </div>

        <div>
          <label htmlFor="booking-date" className={label}>
            Date *
          </label>
          <input id="booking-date" name="date" type="date" required className={field} />
        </div>

        <div>
          <label htmlFor="booking-time" className={label}>
            Pickup time
          </label>
          <input id="booking-time" name="time" type="time" className={field} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="booking-pickup" className={label}>
            Pickup address *
          </label>
          <input id="booking-pickup" name="pickup" required autoComplete="street-address" className={field} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="booking-destination" className={label}>
            Where are you going? *
          </label>
          <input id="booking-destination" name="destination" required placeholder="e.g. Outpatients, Hawke’s Bay Hospital" className={field} />
        </div>

        <div>
          <label htmlFor="booking-mobility" className={label}>
            Do you use a mobility aid?
          </label>
          <select id="booking-mobility" name="mobility" className={field} defaultValue="Manual wheelchair">
            <option>Manual wheelchair</option>
            <option>Power chair</option>
            <option>Walker or walking frame</option>
            <option>Walking stick</option>
            <option>None</option>
          </select>
        </div>

        <div>
          <label htmlFor="booking-return" className={label}>
            Do you need a ride home?
          </label>
          <select id="booking-return" name="return" className={field} defaultValue="Yes, I’ll call when I’m ready">
            <option>Yes, I’ll call when I’m ready</option>
            <option>Yes, at a set time</option>
            <option>No, one way only</option>
            <option>Not sure yet</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="booking-funding" className={label}>
            How will you pay?
          </label>
          <select id="booking-funding" name="funding" className={field} defaultValue="Total Mobility card">
            <option>Total Mobility card</option>
            <option>ACC (claim number or purchase order)</option>
            <option>Health NZ travel voucher (NTA)</option>
            <option>EFTPOS or credit card</option>
            <option>Cash</option>
            <option>Invoice to rest home or village</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="booking-notes" className={label}>
            Anything else we should know?
          </label>
          <textarea
            id="booking-notes"
            name="notes"
            rows={3}
            className={field}
            placeholder="Someone travelling with you, the make of your chair, which entrance or department…"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="inline-flex min-h-13 items-center justify-center rounded-full bg-brand px-7 text-[17px] font-semibold text-white hover:bg-brand-dark">
          Send as a text
        </button>
        <button
          type="button"
          onClick={handleEmail}
          className="inline-flex min-h-13 items-center justify-center rounded-full px-7 text-[17px] font-semibold text-ink ring-1 ring-inset ring-navy/30 hover:ring-navy"
        >
          Send as an email
        </button>
      </div>
      <p className="mt-4 text-[15px] text-muted">
        This opens your phone’s messages (or your email) with the details filled in. Nothing is sent until you press send there. We’ll reply to confirm.
      </p>

      {summary && (
        <div className="mt-8 rounded-[10px] border border-line bg-mist p-5" role="status" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-ink">Your booking details</p>
            <button type="button" onClick={handleCopy} className="text-[15px] font-semibold text-brand underline underline-offset-4">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-3 font-sans text-[15px] leading-relaxed whitespace-pre-wrap">{summary}</pre>
          <p className="mt-3 text-[15px]">
            If nothing opened, copy these details and text them to{" "}
            <a href={site.phoneHref} className="font-semibold text-brand underline underline-offset-4">
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
