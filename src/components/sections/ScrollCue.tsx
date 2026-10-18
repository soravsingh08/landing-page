"use client";

import { FiChevronDown } from "react-icons/fi";

/** "Scroll" cue at the foot of the hero — scrolls to whatever section comes next, just below the header. */
export default function ScrollCue() {
  const next = () => {
    const hero = document.getElementById("top");
    const header = document.querySelector<HTMLElement>(".sr-header");
    if (!hero) return;
    window.scrollTo({ top: hero.offsetTop + hero.offsetHeight - (header?.offsetHeight ?? 0), behavior: "smooth" });
  };

  return (
    <button type="button" className="sr-hero-scroll" onClick={next} aria-label="Scroll down">
      <span className="sr-hero-scroll-arrow" aria-hidden="true">
        <FiChevronDown />
      </span>
      <span className="sr-hero-scroll-label" aria-hidden="true">Scroll</span>
    </button>
  );
}
