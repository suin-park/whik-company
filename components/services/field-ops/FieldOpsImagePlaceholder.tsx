import { ImageIcon } from "lucide-react";

type Props = {
  label: string;
  /** Tailwind aspect 유틸 (예: "aspect-[4/3]"). 기본 4:3 */
  ratio?: string;
  className?: string;
};

/** 실제 이미지/스크린샷이 들어갈 자리. 점선 테두리 + 은은한 라인으로 디자인의 일부처럼 보이게. */
export default function FieldOpsImagePlaceholder({
  label,
  ratio = "aspect-[4/3]",
  className = "",
}: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-dashed border-border bg-fg/[0.02] ${ratio} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fg/[0.04] via-transparent to-accent/[0.03]"
        aria-hidden
      />
      <div className="absolute inset-0 grid place-items-center px-4 text-center">
        <div className="flex flex-col items-center gap-2 text-subtle/70">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-fg/[0.03]">
            <ImageIcon className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-xs leading-relaxed">{label}</span>
        </div>
      </div>
    </div>
  );
}
