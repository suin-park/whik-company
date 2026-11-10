import { NextRequest, NextResponse } from "next/server";
import { forward, noSession, portalCode, sameOrigin } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";

/** The signed-in company requests (or cancels) an AI ticket top-up; WHIK opens it after the transfer. */
export async function POST(req: NextRequest) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  const code = await portalCode();
  if (!code) return noSession();
  const b = await req.json().catch(() => ({}));
  const action = b.action === "cancel" ? "cancel" : "request";
  return forward("/api/whik-business/portal/ai-orders", action === "cancel" ? { code, action, id: String(b.id ?? "") } : { code, action, plan: String(b.plan ?? ""), qty: Number(b.qty) });
}
