import type { Metadata } from "next";
import DevelopmentPage from "@/components/business/DevelopmentPage";

export const metadata: Metadata = {
  title: "기업 맞춤형 관리 툴 개발 | WHIK",
  description: "회사의 업무 흐름에 맞춘 웹, 앱 관리 도구를 설계부터 운영까지 함께 만듭니다.",
};

export default function Page() {
  return <DevelopmentPage />;
}
