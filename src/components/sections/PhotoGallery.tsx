"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { LandingConfig } from "@/data/landing";

const SWIPE_PX = 60;

/** "X in pictures" — centred slide with its dimmed neighbours peeking either side. */
export default function PhotoGallery({ config }: { config: LandingConfig }) {
  const gallery = config.gallery;
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; dx: number } | null>(null);
  const dragged = useRef(false);
  if (!gallery) return null;

  const n = gallery.items.length;
  const go = (step: number) => setActive(a => (a + step + n) % n);

  // The drag offset is written straight to a CSS variable so slides track the finger without re-rendering.
  const setDrag = (dx: number) => stageRef.current?.style.setProperty("--drag", `${dx}px`);

  const endDrag = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    dragged.current = Math.abs(d.dx) > 4;
    stageRef.current?.classList.remove("is-dragging");
    setDrag(0);
    if (Math.abs(d.dx) > SWIPE_PX) go(d.dx < 0 ? 1 : -1);
  };

  return (
    <section className="sr-section sr-gallery" aria-labelledby="sr-gallery-title">
      <h2 id="sr-gallery-title" className="sr-title sr-gallery-title" data-aos="fade-up">
        {gallery.title}
      </h2>

      <div
        ref={stageRef}
        className="sr-gallery-stage"
        role="region"
        aria-roledescription="carousel"
        aria-labelledby="sr-gallery-title"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        onPointerDown={e => {
          if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
          drag.current = { x: e.clientX, dx: 0 };
        }}
        onPointerMove={e => {
          const d = drag.current;
          if (!d) return;
          d.dx = e.clientX - d.x;
          if (Math.abs(d.dx) > 4) stageRef.current?.classList.add("is-dragging");
          setDrag(d.dx);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {gallery.items.map((item, i) => {
          // Shortest signed distance from the active slide, so the loop wraps both ways.
          let off = (i - active + n) % n;
          if (off > n / 2) off -= n;
          const pos = off === 0 ? "is-active" : off === -1 ? "is-prev" : off === 1 ? "is-next" : off < 0 ? "is-gone-left" : "is-gone-right";
          return (
            <figure
              key={item.caption}
              className={`sr-gallery-slide ${pos}`}
              aria-hidden={off !== 0}
              onClick={() => !dragged.current && Math.abs(off) === 1 && go(off)}
            >
              <Image quality={90}
                src={item.image}
                alt={item.alt}
                fill
                draggable={false}
                placeholder="blur"
                sizes="(max-width: 767px) 88vw, 960px"
              />
              <figcaption>{item.caption}</figcaption>
            </figure>
          );
        })}

        <button type="button" className="sr-gallery-arrow sr-gallery-arrow--prev" aria-label="Previous photo" onClick={() => go(-1)}>
          <FiChevronLeft aria-hidden="true" />
        </button>
        <button type="button" className="sr-gallery-arrow sr-gallery-arrow--next" aria-label="Next photo" onClick={() => go(1)}>
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>

      <p className="sr-gallery-count" aria-live="polite">
        {active + 1} / {n}
      </p>
    </section>
  );
}
