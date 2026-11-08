"use client";
// Kept identical to 3D Locker src/app/admin/whik-business/_docs.tsx so both sides print the same paper.
import { useEffect, useRef, useState } from "react";

// Print-ready quote and contract documents (A4, light paper look) plus a signature pad.
// The whik.co.kr portal renders the same layout so both sides print the same paper.

export type Provider = {
  name: string;
  representative: string;
  bizRegNo: string;
  address: string;
  phone: string;
  email: string;
  bizType?: string;
  bizItem?: string;
  bankAccount?: string;
  /** Company seal image (data URL), stamped on quotes and contracts. */
  seal?: string;
};
export type ClientInfo = {
  companyName: string;
  bizRegNo?: string | null;
  ceoName?: string | null;
  address?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
};
export type QuoteItem = { name: string; spec?: string; qty: number; unitPrice: number; note?: string };
export type QuoteDoc = {
  number: string;
  title: string;
  items: QuoteItem[];
  supplyAmount: number;
  vatAmount: number;
  totalAmount: number;
  validUntil?: string | Date | null;
  notes?: string | null;
  sentAt?: string | Date | null;
  createdAt?: string | Date | null;
};
export type ContractDoc = {
  number: string;
  title: string;
  body: string;
  amount: number;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  sentAt?: string | Date | null;
  documentHash?: string | null;
  clientSignerName?: string | null;
  clientSignerTitle?: string | null;
  clientSignature?: string | null;
  clientSignedAt?: string | Date | null;
  clientSignedIp?: string | null;
  providerSignerName?: string | null;
  providerSignature?: string | null;
  providerSignedAt?: string | Date | null;
  status?: string;
};

const won = (n: number) => Math.round(n).toLocaleString("ko-KR");
const day = (d?: string | Date | null) => (d ? new Date(d).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "long", day: "numeric" }) : "-");
const stamp = (d?: string | Date | null) => (d ? new Date(d).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }) : "-");

function koreanAmount(n: number) {
  n = Math.round(n);
  if (n === 0) return "영";
  const digits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  const small = ["", "십", "백", "천"];
  const big = ["", "만", "억", "조"];
  let out = "";
  let g = 0;
  while (n > 0) {
    let part = n % 10000;
    if (part) {
      let s = "";
      for (let i = 0; i < 4 && part > 0; i++) {
        const d = part % 10;
        if (d) s = digits[d] + small[i] + s;
        part = Math.floor(part / 10);
      }
      out = s + big[g] + out;
    }
    n = Math.floor(n / 10000);
    g++;
  }
  return out;
}

function PartyTable({ label, rows }: { label: string; rows: [string, string | null | undefined][] }) {
  return (
    <table className="wb-party">
      <thead>
        <tr>
          <th colSpan={2}>{label}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <td className="k">{k}</td>
            <td>{v || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function QuoteDocument({ q, client, provider }: { q: QuoteDoc; client: ClientInfo; provider: Provider }) {
  return (
    <article className="wb-paper">
      <header className="wb-head">
        <div>
          <p className="wb-eyebrow">QUOTATION</p>
          <h1>견 적 서</h1>
        </div>
        <div className="wb-meta">
          <div>
            <span>견적 번호</span>
            <b>{q.number}</b>
          </div>
          <div>
            <span>견적일</span>
            <b>{day(q.sentAt ?? q.createdAt)}</b>
          </div>
          <div>
            <span>유효기간</span>
            <b>{q.validUntil ? `${day(q.validUntil)}까지` : "-"}</b>
          </div>
        </div>
      </header>

      <div className="wb-parties">
        <PartyTable
          label="수 신"
          rows={[
            ["상호", client.companyName],
            ["사업자번호", client.bizRegNo],
            ["대표자", client.ceoName],
            ["담당자", client.contactName],
            ["연락처", [client.contactPhone, client.contactEmail].filter(Boolean).join(" / ")],
          ]}
        />
        <PartyTable
          label="공 급 자"
          rows={[
            ["상호", provider.name],
            ["사업자번호", provider.bizRegNo],
            ["대표자", provider.representative],
            ["주소", provider.address],
            ["연락처", `${provider.phone} / ${provider.email}`],
            ...(provider.bizType ? ([["업태 / 종목", `${provider.bizType} / ${provider.bizItem ?? "-"}`]] as [string, string][]) : []),
            ...(provider.bankAccount ? ([["입금 계좌", provider.bankAccount]] as [string, string][]) : []),
          ]}
        />
      </div>

      <p className="wb-title">{q.title}</p>
      <div className="wb-total">
        <span>합계 금액 (VAT 포함)</span>
        <strong>
          일금 {koreanAmount(q.totalAmount)}원정 <em>(₩{won(q.totalAmount)})</em>
        </strong>
      </div>

      <table className="wb-items">
        <thead>
          <tr>
            <th style={{ width: 36 }}>No</th>
            <th>품목</th>
            <th>규격 / 내용</th>
            <th style={{ width: 60 }}>수량</th>
            <th style={{ width: 110 }}>단가</th>
            <th style={{ width: 120 }}>공급가액</th>
          </tr>
        </thead>
        <tbody>
          {q.items.map((it, i) => (
            <tr key={i}>
              <td className="c">{i + 1}</td>
              <td>
                {it.name}
                {it.note && <div className="note">{it.note}</div>}
              </td>
              <td>{it.spec || ""}</td>
              <td className="r">{it.qty.toLocaleString("ko-KR")}</td>
              <td className="r">{won(it.unitPrice)}</td>
              <td className="r">{won(it.qty * it.unitPrice)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="r">
              공급가액
            </td>
            <td className="r">{won(q.supplyAmount)}</td>
          </tr>
          <tr>
            <td colSpan={5} className="r">
              부가세 (10%)
            </td>
            <td className="r">{won(q.vatAmount)}</td>
          </tr>
          <tr className="sum">
            <td colSpan={5} className="r">
              합계
            </td>
            <td className="r">{won(q.totalAmount)}</td>
          </tr>
        </tfoot>
      </table>

      {q.notes && (
        <section className="wb-notes">
          <h3>비고</h3>
          <p>{q.notes}</p>
        </section>
      )}
      <footer className="wb-foot">
        위와 같이 견적합니다.{" "}
        <span className="wb-stamp">
          {provider.name}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {provider.seal && <img className="wb-seal" src={provider.seal} alt="휙랩 도장" />}
        </span>
      </footer>
    </article>
  );
}

export function ContractDocument({ k, client, provider, showCertificate = true }: { k: ContractDoc; client: ClientInfo; provider: Provider; showCertificate?: boolean }) {
  const paragraphs = k.body.replace(/\r\n/g, "\n").split("\n");
  return (
    <>
      <article className="wb-paper">
        <header className="wb-head">
          <div>
            <p className="wb-eyebrow">SERVICE AGREEMENT</p>
            <h1>용 역 계 약 서</h1>
          </div>
          <div className="wb-meta">
            <div>
              <span>계약 번호</span>
              <b>{k.number}</b>
            </div>
            <div>
              <span>계약 금액</span>
              <b>₩{won(k.amount)}</b>
            </div>
            <div>
              <span>계약 기간</span>
              <b>{k.startDate && k.endDate ? `${day(k.startDate)} ~ ${day(k.endDate)}` : "본문 참조"}</b>
            </div>
          </div>
        </header>
        <p className="wb-title">{k.title}</p>
        <div className="wb-body">
          {paragraphs.map((p, i) =>
            /^제\d+조/.test(p.trim()) ? (
              <h3 key={i}>{p}</h3>
            ) : p.trim() === "" ? (
              <div key={i} className="gap" />
            ) : (
              <p key={i}>{p}</p>
            ),
          )}
        </div>

        <p className="wb-date">{day(k.clientSignedAt ?? k.sentAt ?? new Date())}</p>
        <div className="wb-signs">
          <div className="wb-sign">
            <p className="role">갑 (발주자)</p>
            <dl>
              <dt>상호</dt>
              <dd>{client.companyName}</dd>
              <dt>사업자번호</dt>
              <dd>{client.bizRegNo || "-"}</dd>
              <dt>주소</dt>
              <dd>{client.address || "-"}</dd>
              <dt>서명자</dt>
              <dd>
                {k.clientSignerName || client.ceoName || "-"}
                {k.clientSignerTitle ? ` (${k.clientSignerTitle})` : ""}
              </dd>
            </dl>
            <div className="sigbox">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {k.clientSignature ? <img src={k.clientSignature} alt="갑 서명" /> : <span>(서명)</span>}
            </div>
          </div>
          <div className="wb-sign wb-sign-provider">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {provider.seal && <img className="wb-seal" src={provider.seal} alt="휙랩 도장" />}
            <p className="role">을 (수급자)</p>
            <dl>
              <dt>상호</dt>
              <dd>{provider.name}</dd>
              <dt>사업자번호</dt>
              <dd>{provider.bizRegNo}</dd>
              <dt>주소</dt>
              <dd>{provider.address}</dd>
              <dt>대표자</dt>
              <dd>{provider.representative}</dd>
              <dt>연락처</dt>
              <dd>
                {provider.phone} / {provider.email}
              </dd>
              {provider.bankAccount && (
                <>
                  <dt>입금 계좌</dt>
                  <dd>{provider.bankAccount}</dd>
                </>
              )}
              <dt>서명자</dt>
              <dd>{k.providerSignerName || provider.representative}</dd>
            </dl>
            <div className="sigbox">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {k.providerSignature ? <img src={k.providerSignature} alt="을 서명" /> : <span>(서명)</span>}
            </div>
          </div>
        </div>
      </article>

      {showCertificate && k.documentHash && (
        <article className="wb-paper wb-cert">
          <header className="wb-head">
            <div>
              <p className="wb-eyebrow">CERTIFICATE OF SIGNATURE</p>
              <h1>전자 계약 증명서</h1>
            </div>
          </header>
          <table className="wb-party wide">
            <tbody>
              <tr>
                <td className="k">계약 번호</td>
                <td>{k.number}</td>
              </tr>
              <tr>
                <td className="k">계약명</td>
                <td>{k.title}</td>
              </tr>
              <tr>
                <td className="k">문서 해시 (SHA-256)</td>
                <td className="mono">{k.documentHash}</td>
              </tr>
              <tr>
                <td className="k">발송 시각</td>
                <td>{stamp(k.sentAt)}</td>
              </tr>
              <tr>
                <td className="k">갑 서명</td>
                <td>{k.clientSignedAt ? `${k.clientSignerName ?? ""}${k.clientSignerTitle ? ` (${k.clientSignerTitle})` : ""}, ${stamp(k.clientSignedAt)}${k.clientSignedIp ? `, IP ${k.clientSignedIp}` : ""}` : "서명 전"}</td>
              </tr>
              <tr>
                <td className="k">을 서명</td>
                <td>{k.providerSignedAt ? `${k.providerSignerName ?? ""}, ${stamp(k.providerSignedAt)}` : "서명 전"}</td>
              </tr>
            </tbody>
          </table>
          <p className="wb-cert-note">
            이 증명서의 문서 해시는 계약서 발송 시점에 고정된 계약 본문, 금액, 기간, 당사자 정보로 계산되었습니다. 서명 시 고객 화면에 표시된 해시와 서버에 저장된 해시가 일치하는 경우에만 서명이 접수됩니다.
          </p>
        </article>
      )}
    </>
  );
}

/** Canvas signature pad; returns a PNG data URL. */
export function SignaturePad({
  onChange,
  height = 180,
  placeholder = "여기에 서명해 주세요",
  clearLabel = "지우기",
}: {
  onChange: (dataUrl: string | null) => void;
  height?: number;
  placeholder?: string;
  clearLabel?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const dirty = useRef(false);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const c = ref.current!;
    let lastWidth = 0;
    // Mobile browsers fire resize while scrolling (address bar); only refit when the
    // width really changes, and keep what was drawn by scaling it into the new size.
    const fit = () => {
      const r = c.getBoundingClientRect();
      if (Math.round(r.width) === lastWidth) return;
      const hadInk = dirty.current && c.width > 0;
      let snapshot: HTMLCanvasElement | null = null;
      if (hadInk) {
        snapshot = document.createElement("canvas");
        snapshot.width = c.width;
        snapshot.height = c.height;
        snapshot.getContext("2d")!.drawImage(c, 0, 0);
      }
      lastWidth = Math.round(r.width);
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      const ctx = c.getContext("2d")!;
      if (snapshot) ctx.drawImage(snapshot, 0, 0, c.width, c.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#111";
      if (hadInk) onChange(c.toDataURL("image/png"));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pos = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const down = (e: React.PointerEvent) => {
    e.preventDefault();
    ref.current!.setPointerCapture(e.pointerId);
    drawing.current = true;
    const ctx = ref.current!.getContext("2d")!;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + 0.1, p.y + 0.1);
    ctx.stroke();
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = ref.current!.getContext("2d")!;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    dirty.current = true;
  };
  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    if (dirty.current) {
      setEmpty(false);
      onChange(ref.current!.toDataURL("image/png"));
    }
  };
  const clear = () => {
    const c = ref.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    dirty.current = false;
    setEmpty(true);
    onChange(null);
  };

  return (
    <div className="relative">
      <canvas
        ref={ref}
        style={{ height, touchAction: "none" }}
        className="block w-full cursor-crosshair rounded-xl border border-dashed border-slate-400/60 bg-white"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onPointerLeave={up}
        aria-label="서명 입력 영역"
      />
      {empty && <span className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-slate-400">{placeholder}</span>}
      <button type="button" onClick={clear} className="absolute right-2 top-2 rounded-md bg-slate-900/80 px-2 py-1 text-[11px] text-white hover:bg-slate-900">
        {clearLabel}
      </button>
    </div>
  );
}

/** Styles for the paper documents; include once per page. */
export const DOC_CSS = `
.wb-paper{background:#fff;color:#111;font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;width:100%;max-width:820px;margin:0 auto;padding:56px 56px 48px;box-shadow:0 30px 80px rgba(0,0,0,.35);border-radius:4px;font-size:13px;line-height:1.7}
.wb-paper+.wb-paper{margin-top:28px}
.wb-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;border-bottom:3px solid #111;padding-bottom:18px;margin-bottom:22px}
.wb-eyebrow{margin:0 0 4px;font-size:10px;letter-spacing:.24em;color:#0f9f86;font-weight:700}
.wb-head h1{margin:0;font-size:30px;letter-spacing:.12em;font-weight:800;white-space:nowrap}
.wb-meta{display:grid;gap:3px;text-align:right;font-size:12px}
.wb-meta span{color:#6b7280;margin-right:10px}
.wb-parties{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px}
.wb-party{width:100%;border-collapse:collapse;font-size:12px}
.wb-party th{background:#111;color:#fff;font-weight:700;letter-spacing:.3em;padding:6px;text-align:center}
.wb-party td{border:1px solid #d1d5db;padding:6px 9px;vertical-align:top}
.wb-party td.k{background:#f3f4f6;width:92px;color:#374151;white-space:nowrap}
.wb-party.wide td.k{width:150px}
.wb-party .mono{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;word-break:break-all}
.wb-title{font-size:16px;font-weight:700;margin:6px 0 12px}
.wb-total{display:flex;justify-content:space-between;align-items:center;gap:12px;border:2px solid #111;padding:12px 16px;margin-bottom:16px}
.wb-total span{font-size:12px;color:#374151}
.wb-total strong{font-size:16px}
.wb-total em{font-style:normal;color:#0f9f86;margin-left:6px}
.wb-items{width:100%;border-collapse:collapse;font-size:12px}
.wb-items th{background:#f3f4f6;border:1px solid #d1d5db;padding:7px;font-weight:700}
.wb-items td{border:1px solid #e5e7eb;padding:7px 9px;vertical-align:top}
.wb-items td.r{text-align:right;font-variant-numeric:tabular-nums}
.wb-items td.c{text-align:center}
.wb-items .note{color:#6b7280;font-size:11px}
.wb-items tfoot td{background:#fafafa;font-weight:600}
.wb-items tfoot tr.sum td{background:#111;color:#fff;font-size:13px}
.wb-notes{margin-top:16px;border-left:3px solid #0f9f86;padding:4px 0 4px 14px}
.wb-notes h3{margin:0 0 4px;font-size:12px}
.wb-notes p{margin:0;white-space:pre-wrap;color:#374151}
.wb-foot{margin-top:30px;padding:16px 0;text-align:right;font-size:13px}
.wb-foot span{font-weight:700;margin-left:8px}
.wb-body h3{font-size:13px;margin:14px 0 2px;font-weight:800}
.wb-body p{margin:0;white-space:pre-wrap;text-align:justify}
.wb-body .gap{height:6px}
.wb-date{text-align:center;margin:30px 0 18px;font-weight:700;letter-spacing:.06em}
.wb-signs{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.wb-sign{border:1px solid #d1d5db;padding:14px}
.wb-sign .role{margin:0 0 8px;font-weight:800}
.wb-sign dl{display:grid;grid-template-columns:72px 1fr;gap:3px 8px;margin:0 0 10px;font-size:12px}
.wb-sign dt{color:#6b7280}
.wb-sign dd{margin:0}
.wb-sign-provider{position:relative}
.wb-sign-provider .wb-seal{position:absolute;top:8px;right:10px;width:68px;height:68px}
.wb-stamp{position:relative;display:inline-block;padding-right:40px}
.wb-stamp .wb-seal{position:absolute;right:0;top:50%;width:56px;height:56px;transform:translateY(-50%) rotate(-4deg)}
.wb-seal{mix-blend-mode:multiply;opacity:.92;pointer-events:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.wb-sign .sigbox{height:92px;border-top:1px dashed #d1d5db;display:grid;place-items:center}
.wb-sign .sigbox img{max-height:84px;max-width:100%}
.wb-sign .sigbox span{color:#9ca3af}
.wb-cert-note{margin-top:16px;font-size:11.5px;color:#4b5563}
@media (max-width:640px){.wb-paper{padding:28px 20px}.wb-parties,.wb-signs{grid-template-columns:1fr}.wb-head{flex-direction:column;align-items:flex-start}.wb-meta{text-align:left}}
@media print{
  @page{size:A4;margin:14mm}
  html,body{background:#fff!important;height:auto!important;overflow:visible!important}
  body *{visibility:hidden}
  body *:has(.wb-print){overflow:visible!important;height:auto!important;max-height:none!important;min-height:0!important;position:static!important;transform:none!important}
  .wb-print,.wb-print *{visibility:visible}
  .wb-print{position:absolute;left:0;top:0;width:100%}
  .wb-paper{box-shadow:none;max-width:none;padding:0;border-radius:0}
  .wb-paper+.wb-paper{break-before:page;margin-top:0}
  .wb-items tr,.wb-sign,.wb-body h3{break-inside:avoid}
}
`;
