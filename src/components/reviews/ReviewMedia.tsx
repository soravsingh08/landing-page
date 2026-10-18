"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import type { Review } from "@/data/landing";

/** Review photo, or a muted looping clip with a sound toggle when the review has a video. */
export default function ReviewMedia({ review }: { review: Review }) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  if (review.video) {
    return (
      <div className="sr-review-media">
        <video
          ref={video}
          src={review.video}
          poster={review.photo?.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`Video from ${review.name}'s trip`}
        />
        <button
          type="button"
          className="sr-review-sound"
          aria-label={muted ? "Unmute video" : "Mute video"}
          onClick={() => {
            const v = video.current;
            if (!v) return;
            v.muted = !v.muted;
            setMuted(v.muted);
          }}
        >
          {muted ? <FiVolumeX aria-hidden="true" /> : <FiVolume2 aria-hidden="true" />}
        </button>
      </div>
    );
  }

  if (!review.photo) return null;
  return (
    <div className="sr-review-media">
      <Image quality={90} src={review.photo} alt={review.photoAlt ?? ""} fill placeholder="blur" sizes="(max-width: 560px) 90vw, 220px" />
    </div>
  );
}
