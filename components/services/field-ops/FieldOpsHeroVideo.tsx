type Props = {
  /** YouTube 임베드 URL (예: https://www.youtube.com/embed/VIDEO_ID) */
  src: string;
  title: string;
};

/** 히어로 우측 영상 임베드 — 16:9 카드, 다크 톤, 자동재생 없음. */
export default function FieldOpsHeroVideo({ src, title }: Props) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
