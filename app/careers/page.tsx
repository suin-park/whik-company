import { PageHeader, Section } from "@/components/Section"
import Link from "next/link"

export default function CareersPage() {
  return (
    <>
      <PageHeader title="Careers" subtitle="혁신적인 팀에 합류하세요" />
      
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-3">열린 포지션</h3>
              <div className="space-y-4">
                {[
                  { title: "AI Research Engineer", location: "Seoul, Remote", type: "Full-time" },
                  { title: "Frontend Developer", location: "Seoul", type: "Full-time" },
                  { title: "Product Designer", location: "Seoul, Remote", type: "Full-time" },
                  { title: "Business Development", location: "Seoul", type: "Full-time" }
                ].map((job, idx) => (
                  <div key={idx} className="card p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg">{job.title}</h4>
                      <span className="text-sm text-subtle">{job.type}</span>
                    </div>
                    <p className="text-subtle">{job.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-3">우리가 찾는 사람</h3>
              <ul className="text-subtle space-y-2">
                <li>• 혁신을 추구하는 열정</li>
                <li>• 협업을 중시하는 마인드</li>
                <li>• 지속적인 학습 의지</li>
                <li>• 창작자 중심의 사고</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl mb-3">복리후생</h3>
              <ul className="text-subtle space-y-2">
                <li>• 경쟁력 있는 연봉</li>
                <li>• 스톡 옵션 제공</li>
                <li>• 유연한 근무 환경</li>
                <li>• 교육비 지원</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="card p-8 text-center">
          <h3 className="text-2xl mb-4">지금 지원하세요</h3>
          <p className="text-subtle mb-6">Whik 팀의 일원이 되어 혁신을 함께 만들어가세요</p>
          <Link href="/contact" className="inline-block px-6 py-3 rounded-2xl bg-accent text-black">
            지원하기
          </Link>
        </div>
      </Section>
    </>
  )
}



















