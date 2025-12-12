import { PageHeader, Section } from "@/components/Section"

export default function CopyrightPage() {
  return (
    <>
      <PageHeader title="Copyright Policy" subtitle="저작권 정책" />
      
      <Section>
        <div className="max-w-4xl">
          <div className="card p-8 space-y-6">
            <div>
              <h3 className="text-xl mb-3">1. 저작권의 귀속</h3>
              <p className="text-subtle">
                Whik Company(이하 "회사")가 제공하는 서비스 및 관련 소프트웨어, 디자인, 로고, 텍스트, 그래픽, 이미지 등 모든 콘텐츠에 대한 저작권은 회사에 귀속됩니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">2. 이용자의 권리</h3>
              <p className="text-subtle">
                이용자는 서비스를 개인적이고 비상업적인 목적으로만 사용할 수 있습니다. 회사의 사전 서면 동의 없이 서비스의 일부 또는 전체를 복제, 배포, 전송, 수정, 전시, 공연, 방송할 수 없습니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">3. 이용자 생성 콘텐츠</h3>
              <p className="text-subtle">
                이용자가 서비스를 통해 생성한 콘텐츠에 대한 저작권은 이용자에게 귀속됩니다. 단, 이용자는 회사가 서비스 제공, 개선, 홍보 목적으로 해당 콘텐츠를 사용할 수 있는 비독점적 라이선스를 회사에 부여합니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">4. 저작권 침해 신고</h3>
              <p className="text-subtle">
                저작권 침해가 의심되는 경우, contact@whik.co.kr로 신고해 주시기 바랍니다. 신고 시 관련 증빙 자료를 함께 제출해 주시면 신속하게 처리하겠습니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">5. 제3자 저작권</h3>
              <p className="text-subtle">
                서비스에 포함된 제3자의 저작물에 대해서는 해당 저작권자의 권리가 존중됩니다. 이용자는 제3자의 저작권을 침해하지 않도록 주의해야 합니다.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}




