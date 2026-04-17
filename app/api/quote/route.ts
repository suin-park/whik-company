import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
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

function getOpenAI() {
  const k = process.env.OPENAI_API_KEY;
  if (!k) throw new Error("OPENAI_API_KEY not set");
  return new OpenAI({ apiKey: k });
}

export async function POST(req: NextRequest) {
  const client = getOpenAI();
  try {
    const body = Body.parse(await req.json());
    const { messages } = body;

    const systemContent = [
      "너는 B2B AI PoC 견적 상담 도우미야.",
      "대화는 4~6 턴 안에서 끝내고,",
      "1) 목표, 2) 기간(2주/4주/8주), 3) 예산대(200~1000만원), 4) 기술 요소를 물어봐.",
      "마지막 답변엔 '예상 범위'를 숫자 구간으로 제시하고,",
      "상담 연결을 위한 다음 단계(문의 폼/미팅 예약)를 한 줄로 안내해.",
    ].join(" ");

    const history = messages.map((m) => ({
      role: m.role === "ai" ? ("assistant" as const) : ("user" as const),
      name: m.role,
      content: m.text,
    }));

    const apiMessages: ChatCompletionMessageParam[] = [
      { role: "system", name: "system", content: systemContent },
      ...history,
    ];

    const rsp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: apiMessages,
      temperature: 0.5,
    });

    const reply = rsp.choices[0]?.message?.content ?? "잠시 후 다시 시도해 주세요.";
    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("quote api error", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "unknown error" },
      { status: 400 }
    );
  }
}

