"use client";

import { useMemo, useState } from "react";
import { packagePath, packageSlides, packagesOfType, unitFor } from "@/data/landing";
import { useLanding } from "../enquiry/EnquiryProvider";
import PackageCard from "./PackageCard";

const INITIAL_VISIBLE = 6;

/** The page's one packages grid, filtered by type chips. */
export default function PackagesExplorer() {
  const config = useLanding();
  const [type, setType] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const list = useMemo(() => packagesOfType(config, type), [config, type]);
  const visible = showAll ? list : list.slice(0, INITIAL_VISIBLE);
  // Only offer chips that would show something.
  const types = useMemo(
    () =>
      config.packageTypes
        .map(t => ({ ...t, count: packagesOfType(config, t.key).length }))
        .filter(t => t.count > 0),
    [config],
  );

  const choose = (key: string | null) => {
    setType(key);
    setShowAll(false);
  };

  return (
    <>
      <div className="sr-chips" role="toolbar" aria-label="Filter packages by type">
        <button type="button" className={`sr-chip${type === null ? " is-active" : ""}`} aria-pressed={type === null} onClick={() => choose(null)}>
          <b>All</b> <span>{config.packages.length}</span>
        </button>
        {types.map(t => (
          <button
            key={t.key}
            type="button"
            className={`sr-chip${type === t.key ? " is-active" : ""}`}
            aria-pressed={type === t.key}
            onClick={() => choose(type === t.key ? null : t.key)}
          >
            {t.short ? (
              <>
                <b className="sr-chip-long">{t.label}</b>
                <b className="sr-chip-short">{t.short}</b>
              </>
            ) : (
              <b>{t.label}</b>
            )}{" "}
            <span>{t.count}</span>
          </button>
        ))}
      </div>

      {/* key re-mounts the grid so the swap animates instead of popping */}
      <div key={type ?? "all"} className="sr-grid sr-grid--compact sr-rail sr-grid-swap">
        {visible.map(pkg => (
          <PackageCard key={pkg.id} pkg={pkg} slides={packageSlides(config, pkg)} href={packagePath(config, pkg)} unit={unitFor(config, pkg)} tag={config.offer.name} />
        ))}
      </div>

      {!showAll && list.length > INITIAL_VISIBLE && (
        <div className="sr-center">
          <button type="button" className="sr-btn sr-btn--outline-maroon" onClick={() => setShowAll(true)}>
            Show all {list.length} packages
          </button>
        </div>
      )}

      {config.priceNote && <p className="sr-price-note">* {config.priceNote}</p>}
    </>
  );
}
