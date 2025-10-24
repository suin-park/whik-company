import { PageHeader, Section } from "@/components/Section"

export default function NewsPage() {
  return (
    <>
      <PageHeader title="News" subtitle="Whik의 최신 소식과 업데이트" />
      
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Whik AI Lab 런칭", date: "2025.01.15", desc: "B2B AI PoC 서비스 정식 출시" },
            { title: "3D Converter 업데이트", date: "2025.01.10", desc: "AR 프리뷰 기능 추가" },
            { title: "Studio v2.0 출시", date: "2025.01.05", desc: "AI Motion Palette 대폭 개선" },
            { title: "파트너십 발표", date: "2024.12.20", desc: "주요 콘텐츠 제작사와 협력" },
            { title: "투자 유치 완료", date: "2024.12.10", desc: "시리즈 A 라운드 성공" },
            { title: "베타 테스트 시작", date: "2024.11.30", desc: "3D Converter 베타 버전 공개" }
          ].map((news, idx) => (
            <div key={idx} className="card p-6">
              <div className="text-sm text-subtle mb-2">{news.date}</div>
              <h3 className="text-lg mb-2">{news.title}</h3>
              <p className="text-subtle">{news.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
