import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // WebP only: AVIF files are a little smaller but much slower to create, which made the
    // first view of each photo (before Vercel caches it) noticeably slow.
    formats: ["image/webp"],
    // 80 for photos (hero, cards, gallery): visibly the same as 90, far fewer bytes. 75 stays the default.
    qualities: [75, 80],
    // Long-lived cache for optimised variants — the sources are fingerprinted static imports.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
