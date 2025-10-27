import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whik.co.kr";
  const now = new Date();
  const urls = ["/", "/about", "/products", "/ai-lab", "/partnership", "/contact"];
  return urls.map((path) => ({
    url: `${host}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  })) as MetadataRoute.Sitemap;
}









