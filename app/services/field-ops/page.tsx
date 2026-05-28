import type { Metadata } from "next";
import FieldOpsHero from "@/components/services/field-ops/FieldOpsHero";
import FieldOpsImpactStats from "@/components/services/field-ops/FieldOpsImpactStats";
import FieldOpsBeforeAfter from "@/components/services/field-ops/FieldOpsBeforeAfter";
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

/** /services/field-ops — 현장형 업체 운영 시스템 구축 랜딩 (오케스트레이션만).
 *  배경 깊이감은 page 레벨 래퍼가 소유하고, 섹션 컴포넌트는 콘텐츠만 책임진다. */
export default function FieldOpsPage() {
  return (
    <div className="field-ops-page">
      {/* Hero — 약한 글로우 + 미세 그리드 (그리드는 Hero 영역에서만) */}
      <div className="field-ops-hero-bg relative overflow-hidden">
        <div className="field-ops-hero-grid" aria-hidden />
        <div className="relative z-10">
          <FieldOpsHero />
        </div>
      </div>

      <div className="field-ops-section-muted">
        <FieldOpsImpactStats />
      </div>

      <FieldOpsBeforeAfter />
      <FieldOpsWorkflow />
      <FieldOpsRoles />

      <div className="field-ops-section-muted">
        <FieldOpsCase />
      </div>

      <FieldOpsAssistant />
      <FieldOpsExtensions />

      <div className="field-ops-section-muted">
        <FieldOpsIndustries />
      </div>

      <FieldOpsProcess />
      <FieldOpsPackages />

      {/* CTA — 본문보다 한 단계 강한 글로우 */}
      <div className="field-ops-cta-bg relative overflow-hidden">
        <FieldOpsCTA />
      </div>

      <div className="field-ops-section-muted">
        <FieldOpsFAQ />
      </div>
    </div>
  );
}
