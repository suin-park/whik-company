"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "AI 개발자가 없어도 가능한가요?",
    a: "네. Whik AI Lab은 기획 중심의 PoC 제작을 전문으로 하며, 고객의 아이디어나 기획서만 있어도 실행 가능한 시제품을 설계하고 제작합니다.",
  },
  {
    q: "예산은 어느 정도 필요한가요?",
    a: "일반적인 PoC 프로젝트는 최소 200만 원대부터 다양한 규모로 진행됩니다. 정확한 금액은 요구사항과 목표 범위에 따라 맞춤 견적으로 산정됩니다.",
  },
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "평균적으로 2~3주 내외에 1차 시제품(PoC)을 완성합니다. 이후 피드백 및 보완 단계를 거쳐 최종 결과물을 전달합니다.",
  },
  {
    q: "정부 과제나 투자용 제안서 제작도 가능한가요?",
    a: "네. 내부 보고서, 투자 제안용 PDF, 전시/데모용 영상 등 목적에 맞는 자료 제작까지 포함한 패키지를 제공합니다.",
  },
  {
    q: "비즈니스 모델 검증 단계에서도 함께할 수 있나요?",
    a: "물론입니다. AI 솔루션의 기획·검증 단계에서 시장성과 기술적 타당성을 동시에 점검하며, 이후 확장 개발까지 연계 가능합니다.",
  },
  {
    q: "지분형(Equity-for-Service) 진행도 가능한가요?",
    a: "가능합니다. 아이템과 팀 구성, 실행 계획을 검토해 일부 제작비를 지분으로 대체하는 파트너십을 제안드릴 수 있습니다. 일반 유상 패키지와 동일한 품질로 진행하며, 지분·IP·베스팅 조건은 상담 후 상호 합의로 확정합니다.",
  },
  {
    q: "미팅은 어떻게 진행되나요?",
    a: "서울·수도권은 대면 미팅으로, 그 외 지역은 Zoom으로 진행합니다. 필요 시 대면/온라인 방식은 상호 협의로 조정 가능합니다.",
  },
];

export default function FAQ({ items = defaultFaqs }: { items?: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="container py-14 md:py-20">
      <h2 className="text-2xl md:text-3xl font-semibold">자주 묻는 질문 (FAQ)</h2>
      <div className="mt-6 space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl border border-border bg-muted/20 overflow-hidden transition-all ${
              open === i ? "bg-muted/30 border-border/80" : ""
            }`}
          >
            <button
              className="flex items-center justify-between w-full text-left px-5 py-4 text-base font-medium"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{item.q}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  open === i ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-subtle leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

