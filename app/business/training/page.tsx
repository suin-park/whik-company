import type { Metadata } from "next";
import TrainingPage from "@/components/business/TrainingPage";

export const metadata: Metadata = {
  title: "사내 교육 요청 | WHIK",
  description: "팀의 작업 환경과 수준에 맞춘 WHIK Studio 실무 교육을 신청하세요.",
};

export default function Page() {
  return <TrainingPage />;
}
