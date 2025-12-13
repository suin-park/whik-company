"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import VideoModal from "@/components/VideoModal";
import { useI18n } from "@/components/I18nProvider";
import ImageCarouselModal from "@/components/ImageCarouselModal";

// 추가
import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeUp,
  fadeUpSlow,
  hoverLift,
} from "@/components/motionPresets";

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      className="container py-12"
      variants={staggerContainer(0.05, 0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl">
        {title}
      </motion.h1>
      {subtitle ? (
        <motion.p
          variants={fadeUpSlow}
          className="text-subtle mt-3 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

// Card에 모션/호버 적용
function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      {...hoverLift}
      className="card p-8 space-y-4 flex flex-col h-full"
    >
      {children}
    </motion.div>
  );
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

  // 다국어 데이터
  const products = t("products") as any;

  return (
    <>
      <PageHeader
        title={products.header.title}
        subtitle={products.header.subtitle}
      />

      {/* 그리드 컨테이너에 stagger */}
      <motion.div
        className="container pb-14 grid md:grid-cols-2 xl:grid-cols-3 gap-8"
        variants={staggerContainer(0.05, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        {/* 3D Locker */}
        <Card>
          <motion.a
            href="https://www.3d-locker.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden group block"
            aria-label="Go to 3D Locker"
            variants={fadeUp}
            {...hoverLift}
          >
            <Image
              src="/images/3d-thumb2.png"
              alt={products.converter.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-left-top transition-transform group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </motion.a>

          <motion.h2 variants={fadeUp} className="text-2xl">
            {products.converter.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-subtle">
            {products.converter.desc}
          </motion.p>
          <motion.ul
            variants={staggerContainer(0.02, 0.05)}
            className="text-subtle list-disc list-inside space-y-1"
          >
            {products.converter.features.map((f: string, i: number) => (
              <motion.li key={i} variants={fadeUp}>
                {f}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp} className="pt-2 mt-auto">
            <a
              href="https://www.3d-locker.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              {products.converter.cta}
            </a>
          </motion.div>
        </Card>

        {/* Whik Studio & Toon */}
        <Card>
          <motion.button
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden group"
            onClick={() =>
              setVideo({ id: "6rCVn3087DM", title: "Whik Studio Demo" })
            }
            aria-label="Play Whik Studio demo video"
            variants={fadeUp}
            {...hoverLift}
          >
            <Image
              src="/images/studio-thumb.png"
              alt={products.studio.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-left-top transition-transform group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </motion.button>

          <motion.h2 variants={fadeUp} className="text-2xl">
            {products.studio.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-subtle">
            {products.studio.desc}
          </motion.p>
          <motion.ul
            variants={staggerContainer(0.02, 0.05)}
            className="text-subtle list-disc list-inside space-y-1"
          >
            {products.studio.features.map((f: string, i: number) => (
              <motion.li key={i} variants={fadeUp}>
                {f}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp} className="pt-2 mt-auto">
            <Link href="/contact" className="text-accent">
              {products.studio.cta}
            </Link>
          </motion.div>
        </Card>

        {/* Whik Works – 캐러셀 모달 */}
        <Card>
          <motion.button
            onClick={() => setWorksOpen(true)}
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden group"
            aria-label="Open Whik Works gallery"
            variants={fadeUp}
            {...hoverLift}
          >
            <Image
              src="/images/works-thumb.png"
              alt={products.works.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </motion.button>

          <motion.h2 variants={fadeUp} className="text-2xl">
            {products.works.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-subtle">
            {products.works.desc}
          </motion.p>
          <motion.ul
            variants={staggerContainer(0.02, 0.05)}
            className="text-subtle list-disc list-inside space-y-1"
          >
            {products.works.features.map((f: string, i: number) => (
              <motion.li key={i} variants={fadeUp}>
                {f}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp} className="pt-2 mt-auto">
            <Link href="/contact" className="text-accent">
              {products.works.cta}
            </Link>
          </motion.div>
        </Card>
      </motion.div>

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
