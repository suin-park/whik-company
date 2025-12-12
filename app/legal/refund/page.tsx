import { PageHeader, Section } from "@/components/Section"

export default function RefundPage() {
  return (
    <>
      <PageHeader title="Refund Policy" subtitle="환불 정책" />
      
      <Section>
        <div className="max-w-4xl">
          <div className="card p-8 space-y-6">
            <div>
              <h3 className="text-xl mb-3">1. 환불 원칙</h3>
              <p className="text-subtle">
                Whik Company(이하 "회사")는 디지털 상품 및 서비스의 특성상, 원칙적으로 구매 후 환불이 제한될 수 있습니다. 다만, 다음의 경우에는 환불이 가능합니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">2. 환불 가능한 경우</h3>
              <p className="text-subtle">
                <ul className="list-disc list-inside space-y-2 text-subtle">
                  <li>서비스 제공에 중대한 결함이 있어 정상적인 이용이 불가능한 경우</li>
                  <li>회사의 귀책사유로 인해 서비스를 제공하지 못한 경우</li>
                  <li>구매 후 7일 이내에 서비스를 전혀 이용하지 않은 경우 (단, 구매 시점부터 7일 이내)</li>
                  <li>기타 소비자기본법 등 관련 법령에 따라 환불이 가능한 경우</li>
                </ul>
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">3. 환불 불가능한 경우</h3>
              <p className="text-subtle">
                <ul className="list-disc list-inside space-y-2 text-subtle">
                  <li>이용자가 서비스를 이미 사용한 경우</li>
                  <li>구매 후 7일이 경과한 경우</li>
                  <li>이용자의 귀책사유로 인한 환불 요청</li>
                  <li>무료로 제공된 서비스 또는 프로모션 상품</li>
                </ul>
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">4. 환불 절차</h3>
              <p className="text-subtle">
                환불을 원하시는 경우 contact@whik.co.kr로 문의해 주시기 바랍니다. 환불 요청 시 구매 내역, 환불 사유, 결제 정보 등을 확인한 후, 영업일 기준 3-5일 내에 처리됩니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-3">5. 환불 방법</h3>
              <p className="text-subtle">
                환불은 원칙적으로 구매 시 사용한 결제 수단으로 환불됩니다. 신용카드 결제의 경우 카드사 정책에 따라 환불 완료까지 최대 7-14일이 소요될 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}




