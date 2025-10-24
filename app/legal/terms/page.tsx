import { PageHeader, Section } from "@/components/Section"

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" subtitle="서비스 이용약관" />
      
      <Section>
        <div className="max-w-4xl">
          <div className="card p-8 space-y-6">
            <div>
              <h3 className="text-xl mb-3">1. 서비스 이용</h3>
              <p className="text-subtle">
                본 약관은 Whik Company(이하 "회사")가 제공하는 모든 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정합니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">2. 이용자의 의무</h3>
              <p className="text-subtle">
                이용자는 서비스 이용 시 관련 법령을 준수하고, 타인의 권리를 침해하지 않아야 합니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">3. 지적재산권</h3>
              <p className="text-subtle">
                서비스에 포함된 모든 콘텐츠의 지적재산권은 회사에 귀속됩니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">4. 서비스 변경 및 중단</h3>
              <p className="text-subtle">
                회사는 사전 고지 후 서비스를 변경하거나 중단할 수 있습니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">5. 면책조항</h3>
              <p className="text-subtle">
                회사는 이용자가 서비스를 이용하여 발생한 손해에 대해 책임을 지지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}


