"use client";

import { useEffect } from "react";
import AOS from "aos";

/** Boots AOS scroll animations once on the client. */
export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);
  return null;
}
