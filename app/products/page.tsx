"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import VideoModal from "@/components/VideoModal";
import { useI18n } from "@/components/I18nProvider";
import ImageCarouselModal from "@/components/ImageCarouselModal";

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl">{title}</h1>
      {subtitle ? <p className="text-subtle mt-3 max-w-2xl">{subtitle}</p> : null}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="card p-8 space-y-4 flex flex-col h-full">{children}</div>;
}

export default function ProductsPage() {
  const { t } = useI18n();
  const [video, setVideo] = useState<null | { id: string; title: string }>(null);

  // Works 슬라이더 상태
  const [worksOpen, setWorksOpen] = useState(false);

  // Works 이미지 리스트
  const worksImages = [
    { src: "/images/work_1.png", alt: "Whik Works 1" },
    { src: "/images/work_2.png", alt: "Whik Works 2" },
    { src: "/images/work_3.png", alt: "Whik Works 3" },
    { src: "/images/work_4.png", alt: "Whik Works 4" },
    { src: "/images/work_5.png", alt: "Whik Works 5" },
  ];

  // 다국어 데이터 가져오기
  const products = t("products") as any;

  return (
    <>
      <PageHeader 
        title={products.header.title} 
        subtitle={products.header.subtitle} 
      />

      {/* 2열→3열 반응형 */}
      <div className="container pb-14 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Whik Works – 캐러셀 모달 적용 */}
        <Card>
          <button
            onClick={() => setWorksOpen(true)}
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden group"
            aria-label="Open Whik Works gallery"
          >
            <Image
              src="/images/works-thumb.png"
              alt={products.works.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>

          <h2 className="text-2xl">{products.works.title}</h2>
          <p className="text-subtle">{products.works.desc}</p>
          <ul className="text-subtle list-disc list-inside space-y-1">
            {products.works.features.map((f: string, i: number) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <div className="pt-2 mt-auto">
            <Link href="/contact" className="text-accent">{products.works.cta}</Link>
          </div>
        </Card>

        {/* Whik 3D Converter */}
        <Card>
          <button
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden group"
            onClick={() => setVideo({ id: "03eeHR_qX5E", title: "Whik 3D Converter Demo" })}
            aria-label="Play Whik 3D Converter demo video"
          >
            <Image
              src="/images/3d-thumb.png"
              alt={products.converter.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>

          <h2 className="text-2xl">{products.converter.title}</h2>
          <p className="text-subtle">{products.converter.desc}</p>
          <ul className="text-subtle list-disc list-inside space-y-1">
            {products.converter.features.map((f: string, i: number) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <div className="pt-2 mt-auto">
            <Link href="/contact" className="text-accent">{products.converter.cta}</Link>
          </div>
        </Card>

        {/* Whik Studio */}
        <Card>
          <button
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden group"
            onClick={() => setVideo({ id: "6rCVn3087DM", title: "Whik Studio Demo" })}
            aria-label="Play Whik Studio demo video"
          >
            <Image
              src="/images/studio-thumb.png"
              alt={products.studio.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>

          <h2 className="text-2xl">{products.studio.title}</h2>
          <p className="text-subtle">{products.studio.desc}</p>
          <ul className="text-subtle list-disc list-inside space-y-1">
            {products.studio.features.map((f: string, i: number) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <div className="pt-2 mt-auto">
            <Link href="/contact" className="text-accent">{products.studio.cta}</Link>
          </div>
        </Card>
      </div>

      {/* Video modal (Studio/3D 전용) */}
      <VideoModal
        open={!!video}
        onClose={() => setVideo(null)}
        youtubeId={video?.id ?? ""}
        title={video?.title ?? ""}
      />

      {/* 이미지 캐러셀 모달 (Works 전용) */}
      <ImageCarouselModal
        open={worksOpen}
        onClose={() => setWorksOpen(false)}
        images={worksImages}
        startIndex={0}
      />
    </>
  );
}
