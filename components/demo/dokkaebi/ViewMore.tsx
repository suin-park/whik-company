"use client";
import { useState } from "react";
import { MENU_SHOTS, STORE, STORES, fmt } from "./data";
import { Chip, Eyebrow, Panel, PhoneFrame, useTypewriter } from "./ui";

/* ---------------- SNS content ---------------- */

const CAPTIONS: Record<string, Record<"insta" | "threads" | "shorts", string>> = {
  m1: {
    insta: "불맛은 거짓말을 안 합니다 🔥\n철판 위에서 지글지글 익어가는 불쭈꾸미, 오늘 저녁 어떠세요?\n\n📍 청주 본점 | 예약은 네이버에서\n#청주맛집 #쭈꾸미 #불쭈꾸미 #청주데이트 #돗가비불쭈꾸미",
    threads: "청주에서 쭈꾸미 하면 여기라는 말, 철판 올라오는 순간 이해됩니다. 불향이 먼저 와요. 매운 거 잘 드시는 분들 태그해 주세요 🔥",
    shorts: "0초: 철판에 쭈꾸미 투하, 치익 소리 클로즈업\n2초: 불길 확 올라오는 장면 + 자막 '이게 불맛'\n5초: 집게로 한 점 들어 올리기, 치즈 늘어남\n8초: 손님 한입, 리액션\n12초: 매장 외관 + '청주 본점, 오늘 저녁 7시'",
  },
  m2: {
    insta: "신메뉴 나왔습니다 🧀\n불쭈꾸미 다 드시고 남은 양념에 치즈 폭포 볶음밥!\n위에서 치즈를 쏟아붓는 순간을 꼭 영상으로 남기세요.\n\n이번 주 단골 손님께는 무료로 드려요.\n#청주맛집 #치즈볶음밥 #신메뉴 #돗가비불쭈꾸미",
    threads: "쭈꾸미 먹고 볶음밥 안 먹으면 반만 먹은 거라는 말 들어보셨어요? 이번엔 치즈를 폭포처럼 부어드립니다. 영상 찍으러 오세요 🧀",
    shorts: "0초: 남은 양념 위에 밥 투하\n2초: 볶는 소리 + 김가루\n4초: 위에서 치즈 쏟아붓기, 슬로모션\n7초: 숟가락으로 쭉 늘리기\n10초: 자막 '신메뉴 치즈 폭포 볶음밥'",
  },
  m3: {
    insta: "주말엔 둘이서 🔥\n불쭈꾸미 2인 + 볶음밥 + 음료 2잔 세트를 주말 한정 가격으로 준비했어요.\n\n토, 일 오후 3시부터 | 예약은 네이버로\n#청주데이트 #주말맛집 #쭈꾸미세트 #돗가비불쭈꾸미",
    threads: "주말에 뭐 먹지 고민하는 커플들께. 둘이 와서 배부르게 먹고 볶음밥까지, 주말 세트 만들었습니다. 네이버 예약하면 자리 잡아둘게요.",
    shorts: "0초: 두 사람 손이 동시에 집게로\n3초: 세트 구성 컷 전환 3개\n7초: 자막 '주말 2인 세트'\n9초: 네이버 예약 화면 + '토, 일 오후 3시부터'",
  },
};

export function ViewContent({ toast }: { toast: (m: string) => void }) {
  const [shot, setShot] = useState(MENU_SHOTS[1].id);
  const [ch, setCh] = useState<"insta" | "threads" | "shorts">("insta");
  const [gen, setGen] = useState(0);
  const S = MENU_SHOTS.find((m) => m.id === shot)!;
  const cap = CAPTIONS[shot][ch];
  const typed = useTypewriter(cap, gen > 0, 12);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Panel className="p-5 md:p-6">
        <Eyebrow>SNS CONTENT</Eyebrow>
        <h3 className="m-0 mt-1 text-xl font-semibold md:text-2xl">사진 한 장이면 인스타, 스레드, 쇼츠까지</h3>
        <p className="m-0 mt-1 text-[13px] text-white/50">메뉴 사진을 고르면 채널마다 맞는 글과 영상 대본을 씁니다. 사장님이 확인하고 예약만 누르면 올라갑니다.</p>

        <p className="m-0 mt-5 text-[12px] font-semibold text-white/50">1. 사진 고르기</p>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {MENU_SHOTS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setShot(m.id);
                setGen(0);
              }}
              className={`group relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${m.hue} text-left ring-2 transition ${shot === m.id ? "ring-[#ff5a36]" : "ring-transparent hover:ring-white/25"}`}
            >
              <span className="dk-steam absolute inset-0" />
              <span className="absolute left-2.5 top-2.5 hidden sm:block">
                <Chip tone="slate">{m.tag}</Chip>
              </span>
              <span className="absolute bottom-2 left-2 right-2 text-[12px] font-bold leading-tight text-white drop-shadow sm:bottom-2.5 sm:left-2.5 sm:right-2.5 sm:text-[13px] md:text-[15px]">{m.name}</span>
            </button>
          ))}
        </div>

        <p className="m-0 mt-5 text-[12px] font-semibold text-white/50">2. 채널 고르기</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ["insta", "인스타그램"],
              ["threads", "스레드"],
              ["shorts", "유튜브 쇼츠 대본"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setCh(k);
                if (gen) setGen((g) => g + 1);
              }}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${ch === k ? "bg-white text-[#111]" : "bg-white/[.06] text-white/65 hover:text-white"}`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => setGen((g) => g + 1)} className="rounded-xl bg-[#ff5a36] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_32px_-10px_rgba(255,90,54,.8)]">
            AI로 글 쓰기
          </button>
          {gen > 0 && typed.length >= cap.length && (
            <>
              <button type="button" onClick={() => toast("금요일 오후 6시에 올라가도록 예약했어요")} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#111]">
                금요일 18:00 예약 업로드
              </button>
              <button type="button" onClick={() => setGen((g) => g + 1)} className="text-[13px] text-white/55 underline">
                다른 버전
              </button>
            </>
          )}
        </div>
        <pre className="mt-4 min-h-[150px] whitespace-pre-wrap rounded-xl border border-white/[.08] bg-black/30 p-4 font-sans text-[13.5px] leading-relaxed text-white/85">
          {gen > 0 ? typed : <span className="text-white/30">AI로 글 쓰기를 누르면 여기에 글이 써집니다.</span>}
        </pre>
        <p className="m-0 mt-3 text-[11.5px] text-white/40">인스타그램, 스레드는 비즈니스 계정을 연결하면 바로 올라가고, 유튜브 쇼츠는 촬영 대본으로 드립니다.</p>
      </Panel>

      <div className="xl:sticky xl:top-24 xl:self-start">
        <p className="m-0 mb-3 text-center text-[12px] text-white/45">미리보기</p>
        <PhoneFrame>
          <div className="flex h-full flex-col bg-white pt-10 text-[#111]">
            <div className="flex items-center gap-2 px-3 py-2">
              <img src="/demo/dokkaebi/emblem.png" alt="" width={28} height={28} className="h-7 w-7 rounded-full ring-1 ring-black/10" />
              <span className="text-[12px] font-bold">dokkaebi_demo</span>
            </div>
            <div className={`relative aspect-square bg-gradient-to-br ${S.hue}`}>
              <span className="dk-steam absolute inset-0" />
              <span className="absolute bottom-3 left-3 text-[17px] font-extrabold text-white drop-shadow">{S.name}</span>
            </div>
            <div className="flex-1 overflow-hidden px-3 py-2 text-[11.5px] leading-snug">
              <p className="m-0 font-bold">좋아요 1,284개</p>
              <p className="m-0 mt-1 line-clamp-6 whitespace-pre-wrap">{gen > 0 ? typed : "글이 여기에 들어갑니다."}</p>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}

/* ---------------- Franchise HQ ---------------- */

export function ViewHQ({ toast }: { toast: (m: string) => void }) {
  const live = STORES.filter((s) => !s.sample);
  const [pushed, setPushed] = useState(false);
  return (
    <div className="grid gap-5">
      <Panel className="p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>FRANCHISE HQ</Eyebrow>
            <h3 className="m-0 mt-1 text-xl font-semibold md:text-2xl">가맹점이 늘어도 본사 화면 하나로</h3>
            <p className="m-0 mt-1 text-[13px] text-white/50">매장마다 고객은 따로 관리하고, 본사는 전체 흐름과 매장별 성과를 봅니다. 새 매장은 계정 하나로 오늘 바로 시작합니다.</p>
          </div>
          <div className="flex gap-6 text-right">
            <div>
              <p className="m-0 text-[11px] text-white/45">전체 고객</p>
              <p className="m-0 text-2xl font-bold tabular-nums">{fmt(live.reduce((a, s) => a + s.customers, 0))}</p>
            </div>
            <div>
              <p className="m-0 text-[11px] text-white/45">이번 달 방문</p>
              <p className="m-0 text-2xl font-bold tabular-nums">{fmt(live.reduce((a, s) => a + s.month, 0))}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {STORES.map((s) => (
            <div key={s.id} className={`rounded-2xl border p-4 ${s.sample ? "border-dashed border-white/15 bg-transparent" : "border-white/[.08] bg-white/[.025]"}`}>
              <div className="flex items-center justify-between">
                <p className="m-0 text-[15px] font-semibold">{s.name}</p>
                <Chip tone={s.sample ? "slate" : "mint"}>{s.open}</Chip>
              </div>
              <p className="m-0 mt-0.5 text-[11.5px] text-white/45">{s.city}</p>
              {s.sample ? (
                <button type="button" onClick={() => toast(`${s.name.replace(" (예시)", "")} 계정을 만들었어요. 응모권 양식과 문자 템플릿이 본사 설정 그대로 복사됩니다.`)} className="mt-5 w-full rounded-xl border border-white/15 py-2.5 text-[12.5px] font-semibold text-white/70 hover:border-[#ff5a36] hover:text-white">
                  + 매장 계정 만들기
                </button>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
                  {[
                    ["고객", fmt(s.customers)],
                    ["이번 달 방문", fmt(s.month)],
                    ["재방문율", `${s.revisit}%`],
                    ["쿠폰 사용률", `${s.coupon}%`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="m-0 text-white/45">{k}</p>
                      <p className="m-0 mt-0.5 text-[16px] font-bold tabular-nums">{v}</p>
                    </div>
                  ))}
                  <div className="col-span-2">
                    <p className="m-0 flex justify-between text-white/45">
                      <span>광고 수신 동의율</span>
                      <span className="text-white/70">{s.consent}%</span>
                    </p>
                    <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/[.07]">
                      <span className="block h-full rounded-full bg-[#3ee0a5]/80" style={{ width: `${s.consent}%` }} />
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel className="p-5">
          <Eyebrow>ONE CLICK, ALL STORES</Eyebrow>
          <h3 className="m-0 mt-1 text-lg font-semibold">본사 캠페인을 모든 매장에 한 번에</h3>
          <div className="mt-4 rounded-xl border border-white/[.08] bg-black/25 p-4 text-[13px]">
            <p className="m-0 font-semibold">12월 연말 감사 쿠폰</p>
            <p className="m-0 mt-1 text-white/55">대상: 전 매장, 11월 방문 고객 중 광고 수신 동의 | 쿠폰: 볶음밥 무료</p>
            <p className="m-0 mt-1 text-white/55">문구와 쿠폰은 본사가 정하고, 발송 시간은 매장이 고릅니다.</p>
          </div>
          <button
            type="button"
            disabled={pushed}
            onClick={() => {
              setPushed(true);
              toast("2개 매장에 캠페인을 배포했어요. 매장 사장님 확인 후 발송됩니다");
            }}
            className="mt-4 rounded-xl bg-[#ff5a36] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {pushed ? "배포 완료 ✓" : "전 매장에 배포"}
          </button>
        </Panel>

        <Panel className="p-5">
          <Eyebrow>COMPLIANCE</Eyebrow>
          <h3 className="m-0 mt-1 text-lg font-semibold">개인정보, 광고 문자 규칙은 시스템이 지킵니다</h3>
          <ul className="m-0 mt-4 grid list-none gap-2.5 p-0 text-[13px]">
            {[
              ["필수 동의와 광고 동의를 따로 저장", "동의 날짜와 방법(응모권, QR, 태블릿)까지 기록"],
              ["광고 문자 앞에 (광고), 끝에 무료 수신거부", "빠뜨리면 발송 버튼이 눌리지 않음"],
              ["밤 9시부터 아침 8시 발송 차단", "예약 시간을 자동으로 옮겨 드림"],
              ["2년마다 수신 동의 확인 안내", "만료 30일 전에 자동으로 알려 드림"],
              ["응모권 사진은 인식 후 바로 삭제", "가맹점별로 고객 정보 접근 권한 분리"],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3 rounded-xl bg-white/[.025] px-4 py-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#3ee0a5] text-[11px] font-black text-[#0b0d0f]">✓</span>
                <span>
                  <span className="block font-semibold">{t}</span>
                  <span className="block text-[12px] text-white/50">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <p className="m-0 text-center text-[11.5px] text-white/35">세종점, 대전 둔산점은 화면 예시입니다. {STORE.brand} 실제 확장 계획과 관계없습니다.</p>
    </div>
  );
}
