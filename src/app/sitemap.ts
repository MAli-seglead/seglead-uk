// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.seglead.com",
      lastModified: new Date("2026-11-06"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
