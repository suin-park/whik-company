"use client";
import { useRef, useState } from "react";
import { CUSTOMERS } from "./data";
import { Chip, Eyebrow, Panel } from "./ui";

type Field = "name" | "phone" | "birthday";
type Row = {
  name: string;
  phone: string;
  birthday: string;
  required: boolean;
  marketing: boolean;
  uncertain: string[];
  alternatives: { field: string; value: string }[];
  /** Where this ticket sits in the photo (0-1), when several tickets were in one photo. */
  box?: { x: number; y: number; w: number; h: number } | null;
};
type Shot = { id: string; url: string; status: "wait" | "read" | "done" | "fail"; error?: string; rows: Row[]; w?: number; h?: number };

/** The ticket's own part of the photo, so staff can compare the fields with the handwriting. */
function TicketCrop({ shot, box }: { shot: Shot; box?: Row["box"] }) {
  const b = box ?? { x: 0, y: 0, w: 1, h: 1 };
  const ratio = shot.w && shot.h ? (b.w * shot.w) / (b.h * shot.h) : 0.75;
  return (
    <div
      aria-label="응모권 사진"
      className="w-2/3 max-w-[220px] rounded-lg bg-white bg-no-repeat ring-1 ring-white/10 sm:w-[150px]"
      style={{
        aspectRatio: String(ratio),
        backgroundImage: `url(${shot.url})`,
        backgroundSize: `${100 / b.w}% ${100 / b.h}%`,
        backgroundPosition: `${b.w < 1 ? (b.x / (1 - b.w)) * 100 : 0}% ${b.h < 1 ? (b.y / (1 - b.h)) * 100 : 0}%`,
      }}
    />
  );
}

/** High resolution so several tickets in one photo can each be cut out and read sharply (3D Locker extractTickets). */
const MAX_SIDE = 3000;
const MAX_B64 = 3_300_000; // server limit 3.5M characters
const MAX_PHOTOS = 12;
const ERR: Record<string, string> = {
  TOO_MANY_SCANS: "시연용 인식 횟수를 다 썼어요. 잠시 후 다시 해 주세요.",
  INVALID_IMAGE: "사진을 읽을 수 없어요. JPG나 PNG로 다시 올려 주세요.",
  EXTRACT_FAILED: "글자를 읽지 못했어요. 밝은 곳에서 다시 찍어 주세요.",
  NOT_CONFIGURED: "지금은 인식을 쓸 수 없어요.",
  UPSTREAM_UNREACHABLE: "서버에 연결하지 못했어요. 잠시 후 다시 해 주세요.",
};

/** Resizes a photo in the browser (keeps EXIF orientation) and returns base64 JPEG without the data: prefix. */
async function toJpeg(file: File): Promise<string> {
  let src: CanvasImageSource & { width: number; height: number };
  try {
    src = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    src = await new Promise<HTMLImageElement>((ok, no) => {
      const img = new Image();
      img.onload = () => ok(img);
      img.onerror = () => no(new Error("decode"));
      img.src = URL.createObjectURL(file);
    });
  }
  for (const side of [MAX_SIDE, 2400, 1600]) {
    const k = Math.min(1, side / Math.max(src.width, src.height));
    const c = document.createElement("canvas");
    c.width = Math.round(src.width * k);
    c.height = Math.round(src.height * k);
    const g = c.getContext("2d")!;
    g.fillStyle = "#fff";
    g.fillRect(0, 0, c.width, c.height);
    g.drawImage(src, 0, 0, c.width, c.height);
    const b64 = c.toDataURL("image/jpeg", 0.85).split(",")[1];
    if (b64.length <= MAX_B64 || side === 1600) return b64;
  }
  throw new Error("decode");
}

const digits = (p: string) => p.replace(/\D/g, "");
const known = new Map(CUSTOMERS.map((c) => [digits(c.phone), c]));

export function RealScan({ toast }: { toast: (m: string) => void }) {
  const [shots, setShots] = useState<Shot[]>([]);
  const [busy, setBusy] = useState(false);
  const camRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const patch = (id: string, p: Partial<Shot>) => setShots((s) => s.map((x) => (x.id === id ? { ...x, ...p } : x)));

  const add = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const list = Array.from(files).filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name)).slice(0, MAX_PHOTOS - shots.length);
    if (list.length === 0) return;
    const fresh: (Shot & { file: File })[] = list.map((f, i) => ({ id: `${Date.now()}-${i}`, url: URL.createObjectURL(f), status: "wait", rows: [], file: f }));
    setShots((s) => [...s, ...fresh.map(({ file: _f, ...x }) => x)]);
    // photo size, for the ticket crops next to each result
    fresh.forEach((x) => {
      const img = new Image();
      img.onload = () => patch(x.id, { w: img.naturalWidth, h: img.naturalHeight });
      img.src = x.url;
    });
    setBusy(true);
    let next = 0;
    const worker = async () => {
      while (next < fresh.length) {
        const s = fresh[next++];
        patch(s.id, { status: "read" });
        try {
          const image = await toJpeg(s.file);
          const res = await fetch("/api/demo/entry-scan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image }) });
          const json = await res.json().catch(() => ({}));
          if (!res.ok || !json.ok) throw new Error(json.error || "EXTRACT_FAILED");
          patch(s.id, { status: "done", rows: json.rows as Row[] });
        } catch (e) {
          const code = (e as Error).message === "decode" ? "INVALID_IMAGE" : (e as Error).message;
          patch(s.id, { status: "fail", error: ERR[code] ?? ERR.EXTRACT_FAILED });
        }
      }
    };
    await Promise.all([worker(), worker()]);
    setBusy(false);
    if (camRef.current) camRef.current.value = "";
    if (fileRef.current) fileRef.current.value = "";
  };

  const setRow = (sid: string, ri: number, p: Partial<Row>) =>
    setShots((s) => s.map((x) => (x.id === sid ? { ...x, rows: x.rows.map((r, i) => (i === ri ? { ...r, ...p } : r)) } : x)));

  const rows = shots.flatMap((s) => s.rows.map((r, ri) => ({ s, r, ri })));
  const savable = rows.filter(({ r }) => r.required && r.name && digits(r.phone).length >= 10);
  const unsure = rows.filter(({ r }) => r.uncertain.length > 0).length;

  return (
    <Panel glow className="p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>TRY IT NOW</Eyebrow>
          <h3 className="m-0 mt-1 text-xl font-semibold md:text-2xl">실제 응모권으로 해보세요</h3>
          <p className="m-0 mt-1 text-[13px] text-white/50">응모권을 찍거나 사진을 여러 장 올리면 AI가 이름, 연락처, 생일, 동의 체크를 읽습니다. 한 장씩도, 하루치를 한 번에도 됩니다.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:flex">
          <button type="button" onClick={() => camRef.current?.click()} disabled={busy} className="rounded-xl bg-[#ff5a36] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(255,90,54,.7)] disabled:opacity-50">
            카메라로 찍기
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} disabled={busy} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white hover:border-white/50 disabled:opacity-50">
            사진 여러 장 올리기
          </button>
        </div>
        <input ref={camRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => add(e.target.files)} />
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </div>

      {shots.length === 0 ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            add(e.dataTransfer.files);
          }}
          className="mt-5 grid w-full place-items-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-6 py-12 text-center transition hover:border-[#ff5a36]/50"
        >
          <span className="text-[15px] font-semibold text-white/80">여기에 응모권 사진을 끌어다 놓거나 눌러서 고르세요</span>
          <span className="mt-1 text-[12px] text-white/40">한 번에 최대 {MAX_PHOTOS}장 | 종이 응모권, 손으로 쓴 명단 모두 됩니다</span>
        </button>
      ) : (
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="grid grid-cols-3 content-start gap-2.5 sm:grid-cols-4 xl:grid-cols-3">
            {shots.map((s) => (
              <div key={s.id} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black/40 ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.url} alt="올린 응모권" className="h-full w-full object-cover" />
                {s.status === "read" && <span className="dk-beam-loop pointer-events-none absolute inset-x-0 top-0 h-10" />}
                <span
                  className={`absolute bottom-1.5 left-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-bold ${
                    s.status === "done" ? "bg-[#16a34a] text-white" : s.status === "fail" ? "bg-[#ff4d6d] text-white" : s.status === "read" ? "bg-[#ff5a36] text-white" : "bg-black/60 text-white/70"
                  }`}
                >
                  {s.status === "done" ? `${s.rows.length}명 읽음` : s.status === "fail" ? "실패" : s.status === "read" ? "읽는 중" : "대기"}
                </span>
              </div>
            ))}
            {shots.length < MAX_PHOTOS && (
              <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className="grid aspect-[3/4] place-items-center rounded-xl border border-dashed border-white/15 text-[12px] text-white/50 hover:border-white/40 disabled:opacity-40">
                + 더 올리기
              </button>
            )}
          </div>

          <div className="rounded-2xl border border-white/[.08] bg-black/20">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[.07] px-4 py-3 text-[12.5px]">
              <span className="font-semibold">인식 결과 {rows.length}명</span>
              <span className="flex gap-1.5">
                {unsure > 0 && <Chip tone="fire">확인 필요 {unsure}</Chip>}
                {busy && <Chip tone="gold">읽는 중…</Chip>}
              </span>
            </div>
            {shots.filter((s) => s.status === "fail").map((s) => (
              <p key={s.id} className="m-0 border-b border-white/[.05] px-4 py-2.5 text-[12.5px] text-[#ffa3b4]">
                사진 1장: {s.error}
              </p>
            ))}
            {rows.length === 0 && !busy && shots.every((s) => s.status !== "wait") && (
              <p className="m-0 px-4 py-10 text-center text-[13px] text-white/40">읽은 손님이 없어요. 응모권이 화면에 꽉 차게 다시 찍어 보세요.</p>
            )}
            <ul className="m-0 grid list-none gap-0 p-0">
              {rows.map(({ s, r, ri }) => {
                const old = known.get(digits(r.phone));
                // names are the hardest part of real handwriting: always shown for a check unless a regular customer's name matches
                const nameOk = !!old && old.name === r.name.replace(/\s/g, "");
                const ring = (f: Field) =>
                  r.uncertain.includes(f) ? "border-[#ff5a36] bg-[#ff5a36]/10" : f === "name" && !nameOk ? "border-[#ffb547]/60 bg-[#ffb547]/[.06]" : "border-white/10 bg-black/30";
                return (
                  <li key={`${s.id}-${ri}`} className="dk-feed border-b border-white/[.05] px-4 py-3.5 last:border-0">
                    <div className="grid gap-3 sm:grid-cols-[150px_minmax(0,1fr)]">
                    <TicketCrop shot={s} box={r.box} />
                    <div className="min-w-0">
                    <div className="grid gap-2 sm:grid-cols-[1fr_1.3fr_0.8fr]">
                      {(["name", "phone", "birthday"] as Field[]).map((f) => (
                        <label key={f} className="block">
                          <span className="mb-1 block text-[10.5px] text-white/40">{f === "name" ? (nameOk ? "이름 (단골 이름과 같음)" : "이름 (사진과 비교해 주세요)") : f === "phone" ? "연락처" : "생일"}</span>
                          <input value={r[f]} onChange={(e) => setRow(s.id, ri, { [f]: e.target.value, uncertain: r.uncertain.filter((u) => u !== f) })} className={`w-full rounded-lg border px-2.5 py-2 text-[14px] outline-none focus:border-[#ffb547] ${ring(f)}`} />
                        </label>
                      ))}
                    </div>
                    {old && !nameOk && (
                      <button
                        type="button"
                        onClick={() => setRow(s.id, ri, { name: old.name, uncertain: r.uncertain.filter((u) => u !== "name"), alternatives: r.alternatives.filter((a) => a.field !== "name") })}
                        className="mt-2 rounded-lg border border-[#ffb547]/60 px-2.5 py-1 text-[11.5px] font-semibold text-[#ffd79a] hover:bg-[#ffb547] hover:text-[#111]"
                      >
                        같은 번호의 단골 손님: {old.name} (이 이름으로 바꾸기)
                      </button>
                    )}
                    {r.alternatives.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11.5px]">
                        <span className="text-white/50">다르게 읽힌 글자:</span>
                        {r.alternatives.map((a) => (
                          <button
                            key={a.field + a.value}
                            type="button"
                            onClick={() => setRow(s.id, ri, { [a.field]: a.value, uncertain: r.uncertain.filter((u) => u !== a.field), alternatives: r.alternatives.filter((x) => x !== a) })}
                            className="rounded-lg border border-[#ff5a36]/50 px-2 py-1 font-semibold text-[#ffb19c] hover:bg-[#ff5a36] hover:text-white"
                          >
                            {a.value}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <button type="button" onClick={() => setRow(s.id, ri, { required: !r.required })}>
                        <Chip tone={r.required ? "mint" : "rose"}>필수 동의 {r.required ? "있음" : "없음"}</Chip>
                      </button>
                      <button type="button" onClick={() => setRow(s.id, ri, { marketing: !r.marketing })}>
                        <Chip tone={r.marketing ? "mint" : "slate"}>광고 수신 {r.marketing ? "동의" : "미동의"}</Chip>
                      </button>
                      {old && <Chip tone="gold">기존 고객, 방문 {old.visits}회</Chip>}
                      {r.uncertain.length > 0 && <Chip tone="fire">주황색 칸을 확인해 주세요</Chip>}
                    </div>
                    </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {rows.length > 0 && (
              <div className="grid gap-2 border-t border-white/[.07] p-4 sm:grid-cols-[1fr_auto]">
                <button
                  type="button"
                  disabled={busy || savable.length === 0}
                  onClick={() => toast(`${savable.length}명 접수 완료 (시연이라 실제로 저장되지는 않아요)`)}
                  className="rounded-xl bg-white py-3 text-sm font-bold text-[#111] transition hover:bg-[#ffb547] disabled:opacity-40"
                >
                  {savable.length}명 고객 DB에 저장
                </button>
                <button type="button" disabled={busy} onClick={() => setShots([])} className="rounded-xl border border-white/15 px-4 py-3 text-sm text-white/70 disabled:opacity-40">
                  다시 하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <p className="m-0 mt-4 text-[11.5px] leading-relaxed text-white/40">
        사진은 글자를 읽는 데만 쓰고 저장하지 않습니다. 읽은 결과도 이 화면에만 보이고 어디에도 저장되지 않습니다. 필수 동의가 없는 응모권은 저장 대상에서 빠집니다.
      </p>
    </Panel>
  );
}
