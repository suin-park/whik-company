import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whik.co.kr";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: [`${host}/sitemap.xml`],
    host,
  };
}









