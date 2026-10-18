import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Srivastava Route Tour Packages",
    short_name: "Srivastava Route",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5b1a18",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
