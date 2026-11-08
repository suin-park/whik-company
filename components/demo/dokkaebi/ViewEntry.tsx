"use client";
import { useEffect, useRef, useState } from "react";
import { STORE, TICKETS, mask, maskPhone, type Ticket } from "./data";
import { Chip, Eyebrow, FakeQR, Panel, PhoneFrame } from "./ui";

/* The paper ticket, redrawn the way we recommend: 010 printed, one box per digit, birthday month/day only. */
export function PaperTicket({ t, scanning = false, done = false, small = false }: { t: Ticket; scanning?: boolean; done?: boolean; small?: boolean }) {
  const digits = t.phone.replace(/\D/g, "").slice(3).split("");
  return (
    <div
      className={`relative overflow-hidden rounded-[6px] bg-[#fbf8f2] text-[#1b1a18] shadow-[0_18px_40px_-18px_rgba(0,0,0,.8)] ${small ? "p-3" : "p-4"}`}
      style={{ transform: `rotate(${t.tilt}deg)` }}
    >
      <div className="flex items-center justify-between border-b-2 border-[#b3261e] pb-1.5">
        <span className={`whitespace-nowrap font-black tracking-[-0.04em] ${small ? "text-[11px]" : "text-[13px]"}`}>{STORE.brand}</span>
        <span className={`whitespace-nowrap font-extrabold text-[#b3261e] ${small ? "text-[9.5px]" : "text-[12px]"}`}>{small ? "경품응모권" : "고객감사 경품응모권"}</span>
      </div>
      <div className={`mt-2 grid gap-1.5 ${small ? "text-[9px]" : "text-[10.5px]"}`}>
        <div className="flex items-end gap-2">
          <span className={`shrink-0 font-bold ${small ? "w-7" : "w-9"}`}>이름</span>
          <span className="dk-hand flex-1 border-b border-[#1b1a18]/40 leading-none" style={{ fontSize: small ? 15 : 19 }}>
            {t.name}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className={`shrink-0 font-bold ${small ? "w-7" : "w-9"}`}>연락처</span>
          <span className="flex min-w-0 items-end gap-[1.5px]">
            <span className="mr-0.5 whitespace-nowrap font-bold">010-</span>
            {digits.map((d, i) => (
              <span key={i} className="flex items-end">
                <span className={`dk-hand grid place-items-center border border-[#1b1a18]/35 leading-none ${small ? "h-[14px] w-[9px]" : "h-[19px] w-[14px]"}`} style={{ fontSize: small ? 12 : 17 }}>
                  {d}
                </span>
                {i === 3 && <span className="mx-[1px] font-bold">-</span>}
              </span>
            ))}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className={`shrink-0 font-bold ${small ? "w-7" : "w-9"}`}>생일</span>
          <span className="dk-hand flex-1 border-b border-[#1b1a18]/40 leading-none" style={{ fontSize: small ? 14 : 18 }}>
            {t.birth || " "}
          </span>
          <span className="whitespace-nowrap text-[#1b1a18]/50">{small ? "월/일" : "월 / 일 (선택)"}</span>
        </div>
        <div className="mt-0.5 grid gap-0.5 text-[#1b1a18]/80">
          <span>
            <span className="dk-hand mr-1 inline-block w-3 text-center text-[#1d4ed8]" style={{ fontSize: small ? 12 : 15 }}>
              {t.required ? "✓" : " "}
            </span>
            [필수] 경품 응모 개인정보 수집, 이용 동의
          </span>
          <span>
            <span className="dk-hand mr-1 inline-block w-3 text-center text-[#1d4ed8]" style={{ fontSize: small ? 12 : 15 }}>
              {t.marketing ? "✓" : " "}
            </span>
            [선택] 혜택 안내 및 광고성 문자 수신 동의
          </span>
        </div>
      </div>
      {scanning && <span className="dk-beam pointer-events-none absolute inset-x-0 top-0 h-10" />}
      {done && (
        <span className="absolute right-2 top-9 grid h-7 w-7 place-items-center rounded-full bg-[#16a34a] text-[13px] font-black text-white shadow-lg" aria-label="인식 완료">
          ✓
        </span>
      )}
    </div>
  );
}

type Row = { t: Ticket; status: "ok" | "check" | "merged" | "noconsent"; phone: string };

export function ViewEntry({ toast }: { toast: (m: string) => void }) {
  const [mode, setMode] = useState<"batch" | "single">("batch");
  const [phase, setPhase] = useState<"idle" | "scan" | "review" | "saved">("idle");
  const [cursor, setCursor] = useState(-1);
  const [rows, setRows] = useState<Row[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const list = mode === "batch" ? TICKETS : TICKETS.slice(0, 1);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const start = () => {
    setRows([]);
    setPhase("scan");
    let i = 0;
    const step = () => {
      setCursor(i);
      timer.current = setTimeout(() => {
        const t = list[i];
        const status: Row["status"] = !t.required ? "noconsent" : t.hard ? "check" : t.dupeOf ? "merged" : "ok";
        setRows((r) => [...r, { t, status, phone: t.hard ? "" : t.phone }]);
        i++;
        if (i < list.length) step();
        else {
          setCursor(-1);
          setPhase("review");
        }
      }, 720);
    };
    step();
  };

  const pick = (idx: number, phone: string) => setRows((r) => r.map((x, i) => (i === idx ? { ...x, phone, status: "ok" } : x)));
  const needCheck = rows.some((r) => r.status === "check");
  const saved = rows.filter((r) => r.status !== "noconsent").length;

  return (
    <div className="grid gap-5">
      <Panel className="p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>PAPER TO DATA</Eyebrow>
            <h3 className="m-0 mt-1 text-xl font-semibold md:text-2xl">응모권, 찍기만 하면 고객이 됩니다</h3>
            <p className="m-0 mt-1 text-[13px] text-white/50">하루치를 모아 한 번에 올려도 되고, 한 장씩 찍어도 됩니다. 애매한 글씨는 AI가 표시해 직원이 골라만 줍니다.</p>
          </div>
          <div className="flex rounded-xl border border-white/10 p-1 text-[13px]">
            {(
              [
                ["batch", "여러 장 한 번에"],
                ["single", "한 장씩"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                type="button"
                disabled={phase === "scan"}
                onClick={() => {
                  setMode(k);
                  setPhase("idle");
                  setRows([]);
                }}
                className={`rounded-lg px-4 py-2 font-semibold transition ${mode === k ? "bg-[#ff5a36] text-white" : "text-white/60 hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="relative rounded-2xl border border-dashed border-white/15 bg-black/20 p-5">
            <div className={`grid gap-5 ${mode === "batch" ? "grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3" : "mx-auto max-w-[340px] grid-cols-1"}`}>
              {list.map((t, i) => (
                <PaperTicket key={t.name} t={t} small={mode === "batch"} scanning={cursor === i} done={rows.length > i} />
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="m-0 text-[12.5px] text-white/50">
                {mode === "batch" ? `사진 ${list.length}장 선택됨` : "카메라로 응모권 1장 촬영"}
                {phase === "scan" && <span className="ml-2 text-[#ffb547]">읽는 중 {rows.length + 1}/{list.length}</span>}
              </p>
              <button type="button" onClick={start} disabled={phase === "scan"} className="rounded-xl bg-[#ff5a36] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(255,90,54,.7)] disabled:opacity-50">
                {phase === "idle" ? (mode === "batch" ? `${list.length}장 한 번에 읽기` : "찍고 읽기") : phase === "scan" ? "읽는 중…" : "다시 읽기"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[.08] bg-black/20">
            <div className="flex items-center justify-between border-b border-white/[.07] px-4 py-3 text-[12.5px]">
              <span className="font-semibold">인식 결과</span>
              {phase === "review" && (
                <span className="flex gap-1.5">
                  <Chip tone="mint">신규 {rows.filter((r) => r.status === "ok").length}</Chip>
                  <Chip tone="gold">기존 고객 {rows.filter((r) => r.status === "merged").length}</Chip>
                  {needCheck && <Chip tone="fire">확인 필요 1</Chip>}
                </span>
              )}
            </div>
            {rows.length === 0 ? (
              <p className="m-0 px-4 py-16 text-center text-[13px] text-white/35">왼쪽에서 읽기를 누르면 결과가 여기에 쌓입니다.</p>
            ) : (
              <ul className="m-0 grid list-none gap-0 p-0">
                {rows.map((r, i) => (
                  <li key={r.t.name} className="dk-feed border-b border-white/[.05] px-4 py-3 last:border-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[14px] font-semibold">
                        {mask(r.t.name)} <span className="font-normal text-white/50">{r.phone ? maskPhone(r.phone) : "010-7710-394?"}</span>
                      </span>
                      {r.status === "ok" && <Chip tone="mint">신규 고객</Chip>}
                      {r.status === "merged" && <Chip tone="gold">기존 고객, {r.t.dupeOf}</Chip>}
                      {r.status === "check" && <Chip tone="fire">마지막 숫자 확인</Chip>}
                      {r.status === "noconsent" && <Chip tone="rose">필수 동의 없음, 저장 안 함</Chip>}
                    </div>
                    <p className="m-0 mt-1 text-[11.5px] text-white/45">
                      생일 {r.t.birth || "미기재"} | 광고 수신 {r.t.marketing ? "동의" : "미동의 (문자 대상 제외)"}
                    </p>
                    {r.status === "check" && r.t.hard && (
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
                        <span className="text-white/55">글씨가 5와 6 사이로 보여요. 응모권을 보고 골라주세요:</span>
                        {r.t.hard.options.map((o) => (
                          <button key={o} type="button" onClick={() => pick(i, o)} className="rounded-lg border border-[#ff5a36]/50 px-2.5 py-1 font-mono font-semibold text-[#ffb19c] hover:bg-[#ff5a36] hover:text-white">
                            {o.slice(-4)}
                          </button>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {phase === "review" && (
              <div className="border-t border-white/[.07] p-4">
                <button
                  type="button"
                  disabled={needCheck}
                  onClick={() => {
                    setPhase("saved");
                    toast(`${saved}명 접수 완료. 생일 쿠폰 대상 ${rows.filter((r) => r.t.birth && r.t.marketing).length}명이 자동 등록됐습니다.`);
                  }}
                  className="w-full rounded-xl bg-white py-3 text-sm font-bold text-[#111] transition hover:bg-[#ffb547] disabled:opacity-40"
                >
                  {needCheck ? "확인 필요한 1건을 먼저 골라주세요" : `${saved}명 고객 DB에 저장`}
                </button>
              </div>
            )}
          </div>
        </div>
      </Panel>

      <QRFlow toast={toast} />
    </div>
  );
}

function QRFlow({ toast }: { toast: (m: string) => void }) {
  const [step, setStep] = useState(0);
  const [req, setReq] = useState(false);
  const [mkt, setMkt] = useState(true);
  return (
    <Panel className="p-5 md:p-6">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div>
          <Eyebrow>TABLE QR</Eyebrow>
          <h3 className="m-0 mt-1 text-xl font-semibold md:text-2xl">종이가 불편한 손님은 QR로 1초 응모</h3>
          <p className="m-0 mt-2 text-[13px] leading-relaxed text-white/55">
            테이블에 QR 하나만 두면 됩니다. 카카오나 네이버로 이름과 번호를 가져와 쓰지 않아도 되고, 어르신은 그대로 종이에 쓰시면 됩니다. 두 방법으로 들어온 고객은 같은 고객 DB에 합쳐집니다.
          </p>
          <ul className="m-0 mt-4 grid list-none gap-2 p-0 text-[13px] text-white/75">
            <li>✓ 필수 동의와 광고 수신 동의를 따로 받습니다</li>
            <li>✓ 응모 즉시 다음 방문 쿠폰이 카카오로 도착</li>
            <li>✓ 같은 손님이 종이와 QR로 두 번 응모해도 1명으로 합쳐짐</li>
          </ul>
        </div>

        <div className="mx-auto w-[220px] rotate-[-3deg] rounded-2xl bg-[#fbf8f2] p-4 text-center text-[#1b1a18] shadow-[0_30px_60px_-20px_rgba(0,0,0,.9)]">
          <p className="m-0 text-[11px] font-black text-[#b3261e]">{STORE.brand}</p>
          <p className="m-0 mt-0.5 text-[15px] font-extrabold">찍고 바로 응모!</p>
          <div className="mx-auto mt-2 w-fit rounded-lg p-1.5 ring-2 ring-[#b3261e]">
            <FakeQR size={150} />
          </div>
          <p className="m-0 mt-2 text-[10.5px] text-[#1b1a18]/60">이번 달 경품: 불쭈꾸미 철판 2인분</p>
        </div>

        <PhoneFrame>
          <div className="flex h-full flex-col bg-gradient-to-b from-[#1b0f0c] to-[#2b130d] px-5 pb-6 pt-12 text-white">
            {step === 0 && (
              <>
                <p className="m-0 text-[11px] font-bold text-[#ffb547]">{STORE.brand}</p>
                <p className="m-0 mt-1 text-[22px] font-extrabold leading-tight">이번 달 경품 응모</p>
                <div className="mt-4 grid h-36 place-items-center rounded-2xl bg-gradient-to-br from-[#ff5a36] via-[#c2261b] to-[#3a0d08] text-center text-[13px] font-bold">
                  불쭈꾸미 철판 2인분
                  <br />
                  매주 10명 추첨
                </div>
                <div className="mt-auto grid gap-2">
                  <button type="button" onClick={() => setStep(1)} className="rounded-xl bg-[#fee500] py-3 text-[14px] font-bold text-[#191919]">
                    카카오로 1초 응모
                  </button>
                  <button type="button" onClick={() => setStep(1)} className="rounded-xl bg-[#03c75a] py-3 text-[14px] font-bold text-white">
                    네이버로 1초 응모
                  </button>
                  <button type="button" onClick={() => setStep(1)} className="py-2 text-[12px] text-white/55 underline">
                    직접 입력하기
                  </button>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <p className="m-0 text-[18px] font-extrabold">이 정보로 응모할게요</p>
                <div className="mt-3 rounded-xl bg-white/10 p-3 text-[13px]">
                  <p className="m-0">윤서연</p>
                  <p className="m-0 mt-0.5 text-white/60">010-****-2231</p>
                  <p className="m-0 mt-0.5 text-white/60">생일 4월 17일</p>
                </div>
                <label className="mt-4 flex items-start gap-2 text-[12px]">
                  <input type="checkbox" checked={req} onChange={(e) => setReq(e.target.checked)} className="mt-0.5 accent-[#ff5a36]" />
                  <span>[필수] 경품 응모를 위한 개인정보 수집, 이용 동의</span>
                </label>
                <label className="mt-2 flex items-start gap-2 text-[12px]">
                  <input type="checkbox" checked={mkt} onChange={(e) => setMkt(e.target.checked)} className="mt-0.5 accent-[#ff5a36]" />
                  <span>[선택] 생일 혜택, 이벤트 문자 수신 동의</span>
                </label>
                <button
                  type="button"
                  disabled={!req}
                  onClick={() => {
                    setStep(2);
                    toast("QR 응모 1건이 고객 DB에 들어왔습니다");
                  }}
                  className="mt-auto rounded-xl bg-[#ff5a36] py-3 text-[14px] font-bold disabled:opacity-40"
                >
                  응모하기
                </button>
              </>
            )}
            {step === 2 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="dk-pop grid h-16 w-16 place-items-center rounded-full bg-[#3ee0a5] text-3xl font-black text-[#0b0d0f]">✓</span>
                <p className="m-0 mt-4 text-[20px] font-extrabold">응모 완료!</p>
                <p className="m-0 mt-1 text-[12.5px] text-white/60">다음 방문 때 쓰는 음료 쿠폰을 카카오톡으로 보냈어요.</p>
                <button type="button" onClick={() => setStep(0)} className="mt-6 text-[12px] text-white/50 underline">
                  처음으로
                </button>
              </div>
            )}
          </div>
        </PhoneFrame>
      </div>
    </Panel>
  );
}

/* ---------------- In-store tablet: visits and stamps ---------------- */

export function ViewTablet({ toast }: { toast: (m: string) => void }) {
  const [num, setNum] = useState("");
  const [shown, setShown] = useState<null | { name: string; stamps: number; newStamp: number }>(null);
  const press = (k: string) => {
    if (k === "del") return setNum((n) => n.slice(0, -1));
    if (num.length < 8) setNum((n) => n + k);
  };
  const submit = () => {
    if (num.length !== 8) return;
    const known = num === "48217730";
    setShown({ name: known ? "박정은" : "새 손님", stamps: known ? 9 : 0, newStamp: known ? 10 : 1 });
    if (known) toast("10번째 스탬프! 불쭈꾸미 철판 무료 쿠폰이 발급됐습니다");
    setTimeout(() => {
      setShown(null);
      setNum("");
    }, 6500);
  };
  const pretty = `010-${num.slice(0, 4).padEnd(4, "•")}-${num.slice(4).padEnd(4, "•")}`;

  return (
    <Panel className="p-5 md:p-6">
      <Eyebrow>IN-STORE TABLET</Eyebrow>
      <h3 className="m-0 mt-1 text-xl font-semibold md:text-2xl">계산대 태블릿에 번호만 누르면 방문 적립</h3>
      <p className="m-0 mt-1 text-[13px] text-white/50">
        도도포인트처럼 번호만 누르면 방문이 쌓이고, 10번째에 쿠폰이 나옵니다. 따로 앱을 깔 필요가 없습니다. 시험해 보세요: <b className="text-white/80">4821 7730</b>
      </p>

      <div className="mx-auto mt-6 max-w-[880px] rounded-[30px] border border-white/15 bg-[#0b0b0c] p-3 shadow-[0_50px_100px_-40px_rgba(0,0,0,.95)]">
        <div className="grid min-h-[430px] overflow-hidden rounded-[22px] bg-[#f6f1ea] text-[#1b1a18] md:grid-cols-[1.05fr_1fr]">
          <div className="relative flex flex-col justify-between bg-gradient-to-br from-[#2a0f0a] via-[#5a160d] to-[#b3261e] p-7 text-white">
            <div>
              <p className="m-0 text-[13px] font-bold text-[#ffb547]">{STORE.brand}</p>
              <p className="m-0 mt-2 text-[30px] font-extrabold leading-tight">
                방문할 때마다
                <br />
                스탬프 하나
              </p>
              <p className="m-0 mt-2 text-[13px] text-white/70">10개 모이면 불쭈꾸미 철판 1인분 무료</p>
            </div>
            {shown ? (
              <div className="dk-pop rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="m-0 text-[15px] font-bold">{shown.name === "새 손님" ? "환영합니다! 첫 스탬프" : `${mask(shown.name)} 님, ${shown.newStamp}번째 방문`}</p>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className={`grid aspect-square place-items-center rounded-full border-2 text-[13px] font-black ${i < shown.newStamp ? "dk-stamp border-[#ffb547] bg-[#ffb547] text-[#5a160d]" : "border-white/30 text-white/30"}`}
                      style={{ animationDelay: `${i === shown.newStamp - 1 ? 0.35 : 0}s` }}
                    >
                      {i < shown.newStamp ? "鬼" : i + 1}
                    </span>
                  ))}
                </div>
                {shown.newStamp >= 10 && <p className="m-0 mt-3 rounded-lg bg-[#ffb547] px-3 py-2 text-center text-[13px] font-extrabold text-[#5a160d]">🎉 무료 쿠폰 발급! 카카오톡으로 보냈어요</p>}
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2 opacity-60">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className="grid aspect-square place-items-center rounded-full border-2 border-white/25 text-[12px] font-bold text-white/40">
                    {i + 1}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col p-6">
            <p className="m-0 text-center text-[13px] font-semibold text-[#1b1a18]/60">휴대폰 번호를 눌러주세요</p>
            <p className="m-0 mt-2 text-center font-mono text-[28px] font-bold tracking-[0.06em]">{pretty}</p>
            <div className="mt-4 grid flex-1 grid-cols-3 gap-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0", "ok"].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => (k === "ok" ? submit() : press(k))}
                  className={`rounded-2xl text-[22px] font-bold transition active:scale-95 ${
                    k === "ok" ? (num.length === 8 ? "bg-[#b3261e] text-white" : "bg-[#b3261e]/30 text-white") : k === "del" ? "bg-[#e9e2d8] text-[15px]" : "bg-white shadow-sm hover:bg-[#fff7ee]"
                  }`}
                >
                  {k === "del" ? "지우기" : k === "ok" ? "적립" : k}
                </button>
              ))}
            </div>
            <p className="m-0 mt-3 text-center text-[10.5px] text-[#1b1a18]/45">적립 시 방문 기록 수집에 동의합니다. 자세히 보기</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}
