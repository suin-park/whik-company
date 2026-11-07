import type { Metadata } from "next";
import BusinessPage from "@/components/business/BusinessPage";

export const metadata: Metadata = {
  title: "기업 지원 | WHIK",
  description: "기업 맞춤형 관리 툴 개발, 계약과 견적, 사내 교육까지. WHIK의 기업 지원을 선택하세요.",
};

export default function Page() {
  return <BusinessPage />;
}
