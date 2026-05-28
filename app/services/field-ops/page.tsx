import type { Metadata } from "next";
import FieldOpsHero from "@/components/services/field-ops/FieldOpsHero";
import FieldOpsProblems from "@/components/services/field-ops/FieldOpsProblems";
import FieldOpsWorkflow from "@/components/services/field-ops/FieldOpsWorkflow";
import FieldOpsCase from "@/components/services/field-ops/FieldOpsCase";
import FieldOpsRoles from "@/components/services/field-ops/FieldOpsRoles";
import FieldOpsAssistant from "@/components/services/field-ops/FieldOpsAssistant";
import FieldOpsExtensions from "@/components/services/field-ops/FieldOpsExtensions";
import FieldOpsIndustries from "@/components/services/field-ops/FieldOpsIndustries";
import FieldOpsProcess from "@/components/services/field-ops/FieldOpsProcess";
import FieldOpsPackages from "@/components/services/field-ops/FieldOpsPackages";
import FieldOpsCTA from "@/components/services/field-ops/FieldOpsCTA";
import FieldOpsFAQ from "@/components/services/field-ops/FieldOpsFAQ";

export const metadata: Metadata = {
  title: "현장형 업체 운영 시스템 구축",
  description:
    "카톡, 전화, 엑셀로 흩어진 현장 업무를 하나로 연결합니다. 상담, 견적, 계약, 일정, 정산까지 회사 업무 흐름에 맞춰 운영 시스템을 구축합니다.",
};

/** /services/field-ops — 현장형 업체 운영 시스템 구축 랜딩 (오케스트레이션만). */
export default function FieldOpsPage() {
  return (
    <>
      <FieldOpsHero />
      <FieldOpsProblems />
      <FieldOpsWorkflow />
      <FieldOpsCase />
      <FieldOpsRoles />
      <FieldOpsAssistant />
      <FieldOpsExtensions />
      <FieldOpsIndustries />
      <FieldOpsProcess />
      <FieldOpsPackages />
      <FieldOpsCTA />
      <FieldOpsFAQ />
    </>
  );
}
