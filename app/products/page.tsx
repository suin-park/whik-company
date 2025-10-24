"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import VideoModal from "@/components/VideoModal";
import { useI18n } from "@/components/I18nProvider";

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl">{title}</h1>
      {subtitle ? <p className="text-subtle mt-3 max-w-2xl">{subtitle}</p> : null}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="card p-8 space-y-4">{children}</div>;
}

export default function ProductsPage() {
  const { t } = useI18n();
  const [video, setVideo] = useState<null | { id: string; title: string }>(null);

  return (
    <>
      <PageHeader title={t("products.header.title")} subtitle={t("products.header.subtitle")} />
      <div className="container pb-14 grid md:grid-cols-2 gap-8">
        {/* Whik Studio 카드 */}
        <Card>
          <button
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden group"
            onClick={() => setVideo({ id: "6rCVn3087DM", title: "Whik Studio Demo" })}
            aria-label="Play Whik Studio demo video"
          >
            <Image
              src="/images/studio-thumb.png"
              alt="Whik Studio"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>

          <h2 className="text-2xl">Whik Studio</h2>
          <p className="text-subtle">AI-powered motion webtoon & storytelling</p>
          <ul className="text-subtle list-disc list-inside space-y-1">
            <li>AI Story Guide</li>
            <li>PSD Layer Parsing</li>
            <li>AI Motion Palette</li>
            <li>Path Animation / Pin Deformer</li>
          </ul>
          <div className="pt-2"><Link href="/contact" className="text-accent">{t("products.studio.more")}</Link></div>
        </Card>

        {/* Whik 3D Converter 카드 */}
        <Card>
          <button
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden group"
            onClick={() => setVideo({ id: "03eeHR_qX5E", title: "Whik 3D Converter Demo" })}
            aria-label="Play Whik 3D Converter demo video"
          >
            <Image
              src="/images/3d-thumb.png"
              alt="Whik 3D Converter"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>

          <h2 className="text-2xl">Whik 3D Converter</h2>
          <p className="text-subtle">Generate high-quality 3D objects from a single image, preview in AR.</p>
          <ul className="text-subtle list-disc list-inside space-y-1">
            <li>Depth-based 3D Reconstruction</li>
            <li>AR preview</li>
            <li>Product/Exhibition visualization</li>
          </ul>
          <div className="pt-2"><Link href="/contact" className="text-accent">{t("products.3d.more")}</Link></div>
        </Card>
      </div>

      {/* Video modal */}
      <VideoModal
        open={!!video}
        onClose={() => setVideo(null)}
        youtubeId={video?.id ?? ""}
        title={video?.title ?? ""}
      />
    </>
  );
}