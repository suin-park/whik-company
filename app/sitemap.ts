import type { MetadataRoute } from "next";
import { nodes, slugOf } from "@/lib/manual/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whik.co.kr";
  const now = new Date();
  const manual = ["/manual", "/manual/start", "/manual/screen", "/manual/shortcuts", "/manual/guides/render", "/manual/guides/ai-pack",
    "/manual/guides/day-to-night", "/manual/nodes", ...nodes.map((n) => `/manual/nodes/${slugOf(n)}`)];
  const urls = ["/", "/about", "/products", "/partnership", "/contact", ...manual];
  return urls.map((path) => ({
    url: `${host}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  })) as MetadataRoute.Sitemap;
}




















