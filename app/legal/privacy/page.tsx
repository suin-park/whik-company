import { PageHeader, Section } from "@/components/Section"

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" subtitle="개인정보처리방침" />
      
      <Section>
        <div className="max-w-4xl">
          <div className="card p-8 space-y-6">
            <div>
              <h3 className="text-xl mb-3">1. 개인정보 수집 및 이용</h3>
              <p className="text-subtle">
                회사는 서비스 제공을 위해 필요한 최소한의 개인정보를 수집합니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">2. 수집하는 개인정보 항목</h3>
              <p className="text-subtle">
                이메일 주소, 이름, 회사명, 문의 내용 등 서비스 이용에 필요한 정보
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">3. 개인정보 보유 및 이용기간</h3>
              <p className="text-subtle">
                수집된 개인정보는 서비스 제공 목적 달성 시까지 보유합니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">4. 개인정보 제3자 제공</h3>
              <p className="text-subtle">
                회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">5. 개인정보 보호를 위한 조치</h3>
              <p className="text-subtle">
                개인정보의 안전한 처리를 위해 기술적, 관리적 보호조치를 취합니다.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}







