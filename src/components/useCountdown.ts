"use client";

import { useEffect, useState } from "react";
import { useLanding } from "./enquiry/EnquiryProvider";

// Next Saturday 00:00 local time; on Saturday itself, the one after — so the
// sale window always shows a full week and never hits zero.
function nextWeeklyReset(now: Date) {
  let daysUntilSaturday = (6 - now.getDay() + 7) % 7;
  if (daysUntilSaturday === 0) daysUntilSaturday = 7;
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilSaturday);
}

function msLeft(endsAt: string | null) {
  const now = new Date();
  const fixed = endsAt ? new Date(endsAt).getTime() : NaN;
  const target = Number.isFinite(fixed) && fixed > now.getTime() ? fixed : nextWeeklyReset(now).getTime();
  return target - now.getTime();
}

const pad = (n: number) => String(n).padStart(2, "0");

export type Countdown = { dd: string; hh: string; mm: string; ss: string };

/**
 * Ticks once a second. Starts as "--" and reads the clock only after mount,
 * so server HTML never depends on the visitor's time (no hydration mismatch).
 */
export function useCountdown(): Countdown {
  const { endsAt } = useLanding().offer;
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setMs(msLeft(endsAt));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (ms == null) return { dd: "--", hh: "--", mm: "--", ss: "--" };
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    dd: pad(Math.floor(s / 86400)),
    hh: pad(Math.floor((s % 86400) / 3600)),
    mm: pad(Math.floor((s % 3600) / 60)),
    ss: pad(s % 60),
  };
}
