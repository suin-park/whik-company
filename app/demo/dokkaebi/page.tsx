import type { Metadata } from "next";
import { Nanum_Pen_Script } from "next/font/google";
import DokkaebiDemo from "@/components/demo/dokkaebi/DokkaebiDemo";

const hand = Nanum_Pen_Script({ weight: "400", subsets: ["latin"], variable: "--font-hand", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "돗가비불쭈꾸미 고객관리 시연 | WHIK",
  description: "응모권 인식, QR 응모, 통합 고객 명부, 쿠폰 문자, AI 비서 시연",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={hand.variable}>
      <DokkaebiDemo />
    </div>
  );
}
