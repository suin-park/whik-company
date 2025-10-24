"use client";

type Props = {
  src: string; // youtube embed url
  title?: string;
  className?: string;
};

export default function YouTubeEmbed({ src, title = "YouTube video", className = "" }: Props) {
  return (
    <div className={`relative w-full aspect-video rounded-2xl overflow-hidden ${className}`}>
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
