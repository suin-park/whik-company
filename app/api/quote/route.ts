import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Msg = z.object({
  role: z.string(),
  text: z.string(),
});

const Body = z.object({
  messages: z.array(Msg),
});

function countUserMessages(messages: { role: string }[]) {
  return messages.filter((m) => m.role === "user").length;
}

export async function POST(req: NextRequest) {
  try {
    const body = Body.parse(await req.json());
    const { messages } = body;
    const userTurns = countUserMessages(messages);

    if (userTurns < 1) {
      return NextResponse.json(
        { ok: false, error: "메시지가 비어 있습니다." },
        { status: 400 }
      );
    }

    let reply: string;

    if (userTurns === 1) {
      reply = [
        "감사합니다. 견적 범위를 좁히려면 아래를 알려주세요.",
        "1) 희망 일정: 대략 2주 / 1개월 / 2개월 중 어디에 가까우신가요?",
        "2) 예산 감각: PoC 단계에서 생각하시는 대략의 예산대(예: 200~500만 원, 500~1,000만 원 등)",
        "3) 인프라·데이터: 사내 데이터 연동, 외부 API, 보안·규제 요구가 있으면 짧게 적어 주세요.",
      ].join("\n");
    } else if (userTurns === 2) {
      reply = [
        "보내주신 내용을 바탕으로, 일반적인 AI PoC·프로토타입 범위는 대략 300만 원~900만 원 전후로 잡는 경우가 많습니다.",
        "데이터 준비·연동 범위가 크거나 3D·실시간 성능이 필요하면 구간이 올라갈 수 있습니다.",
        "더 정확한 견적은 내부 검토가 필요합니다. 화면 아래 문의 폼에 프로젝트 링크나 자료가 있으면 함께 보내 주시면, 담당자가 검토 후 연락드리겠습니다.",
      ].join("\n");
    } else {
      reply = [
        "추가로 궁금하신 점이 있으면 이어서 질문해 주세요.",
        "확정 일정·예산 논의는 이메일 또는 미팅이 가장 빠릅니다. 문의 폼에서 희망 일시를 남겨 주시면 일정 조율을 도와드립니다.",
      ].join("\n");
    }

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error("quote api error", err);
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
