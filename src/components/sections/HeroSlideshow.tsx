"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { LandingConfig } from "@/data/landing";

type Slide = NonNullable<LandingConfig["hero"]["slides"]>[number];

/** How long each photo stays up before crossfading to the next. */
const SLIDE_MS = 4000;

/** Crossfading hero photos. */
export default function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Only advance once the next photo has loaded, so a half-loaded photo never fades in.
  const loaded = useRef<boolean[]>([]);
  const waiting = useRef(false);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
    waiting.current = false;
    if (slides.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => {
      const next = (active + 1) % slides.length;
      if (loaded.current[next]) setActive(next);
      else waiting.current = true;
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, paused, slides.length]);

  // Hold the current photo while the tab is in the background.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onLoad = (i: number) => {
    loaded.current[i] = true;
    if (waiting.current && i === (activeRef.current + 1) % slides.length) {
      waiting.current = false;
      setActive(i);
    }
  };

  return (
    <div className="sr-hero-media">
      {slides.map((s, i) => (
        <div key={s.caption} className={`sr-hero-slide${i === active ? " is-active" : ""}`} aria-hidden={i !== active}>
          <Image
            quality={90}
            src={s.image}
            alt={s.alt}
            fill
            priority={i === 0}
            loading={i === 0 ? undefined : "eager"}
            fetchPriority={i === 0 ? "high" : "low"}
            placeholder="blur"
            sizes="100vw"
            className="sr-hero-img"
            style={s.position ? { objectPosition: s.position } : undefined}
            onLoad={() => onLoad(i)}
          />
        </div>
      ))}
    </div>
  );
}
