import { NextRequest, NextResponse } from "next/server";
import { forward, noSession, portalCode, sameOrigin } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";

/** The signed-in company saves its seal image(s) (PNG data URLs, resized in the browser). */
export async function POST(req: NextRequest) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  const code = await portalCode();
  if (!code) return noSession();
  const b = await req.json().catch(() => ({}));
  if (!Array.isArray(b.seals) || b.seals.length > 3) return NextResponse.json({ ok: false, error: "TOO_MANY_SEALS" }, { status: 400 });
  return forward("/api/whik-business/portal/seals", { code, seals: b.seals });
}
