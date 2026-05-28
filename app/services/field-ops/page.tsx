import type { Metadata } from "next";
import FieldOpsHero from "@/components/services/field-ops/FieldOpsHero";
import FieldOpsBeforeAfter from "@/components/services/field-ops/FieldOpsBeforeAfter";
import FieldOpsRoles from "@/components/services/field-ops/FieldOpsRoles";
import FieldOpsApproach from "@/components/services/field-ops/FieldOpsApproach";
import FieldOpsIndustries from "@/components/services/field-ops/FieldOpsIndustries";
import FieldOpsCase from "@/components/services/field-ops/FieldOpsCase";
import FieldOpsManuals from "@/components/services/field-ops/FieldOpsManuals";
import FieldOpsOutcome from "@/components/services/field-ops/FieldOpsOutcome";
import FieldOpsFAQ from "@/components/services/field-ops/FieldOpsFAQ";

export const metadata: Metadata = {
  title: "현장형 업체 운영 시스템 구축",
  description:
    "카톡, 전화, 엑셀로 흩어진 업무를 하나로 연결합니다. 상담, 견적, 일정, 완료 보고, 정산까지 업체의 실제 업무 흐름에 맞춰 운영 시스템을 구축합니다.",
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

      {/* 흩어진 업무와 정리 후 비교 */}
      <FieldOpsBeforeAfter />

      {/* 역할별 화면 소개 */}
      <div className="field-ops-section-muted">
        <FieldOpsRoles />
      </div>

      {/* 업종을 먼저 이해하고, 화면은 그다음에 만듭니다 */}
      <FieldOpsApproach />

      {/* 이런 업무 구조에 잘 맞습니다 */}
      <div className="field-ops-section-muted">
        <FieldOpsIndustries />
      </div>

      {/* 실제 업무 흐름을 화면으로 정리한 사례 */}
      <FieldOpsCase />

      {/* 도입 후 사용 안내 자료 */}
      <FieldOpsManuals />

      {/* 도입 효과 예시 */}
      <FieldOpsOutcome />

      {/* FAQ + 하단 CTA(우측 상담 카드) */}
      <div className="field-ops-section-muted">
        <FieldOpsFAQ />
      </div>
    </div>
  );
}
