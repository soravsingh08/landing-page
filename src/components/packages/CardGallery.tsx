"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Slide } from "@/data/landing";

type Props = {
  slides: Slide[];
  /** Package page the photo opens. */
  href: string;
  priority?: boolean;
  /** Overlays on the photo, e.g. the badge. */
  children?: React.ReactNode;
};

/** Card photo slider — a scroll-snap track, so swipe is native; arrows and dots drive the same scroll. */
export default function CardGallery({ slides, href, priority = false, children }: Props) {
  const router = useRouter();
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const n = slides.length;

  const goTo = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: ((i + n) % n) * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="sr-card-media">
      <div
        ref={track}
        className="sr-card-track"
        onScroll={e => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        onClick={() => router.push(href)}
      >
        {slides.map((s, i) => (
          <div key={s.image.src} className="sr-card-slide">
            <Image quality={80}
              src={s.image}
              alt={s.alt}
              fill
              placeholder="blur"
              priority={priority && i === 0}
              sizes="(max-width: 767px) 80vw, (max-width: 1100px) 45vw, 380px"
            />
          </div>
        ))}
      </div>

      {n > 1 && (
        <>
          <button type="button" className="sr-card-nav sr-card-nav--prev" aria-label="Previous photo" onClick={() => goTo(index - 1)}>
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="sr-card-nav sr-card-nav--next" aria-label="Next photo" onClick={() => goTo(index + 1)}>
            <FiChevronRight aria-hidden="true" />
          </button>
          <div className="sr-card-dots" aria-hidden="true">
            {slides.map((s, i) => (
              <span key={s.image.src} className={i === index ? "is-active" : undefined} />
            ))}
          </div>
        </>
      )}

      {children}
    </div>
  );
}
