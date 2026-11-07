import { NextRequest, NextResponse } from "next/server";
import { forward, sameOrigin, setPortalCookie } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";

/** Checks the company code with 3D Locker and keeps it in an httpOnly cookie. */
export async function POST(req: NextRequest) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const code = String(body.code ?? "").slice(0, 40);
  const res = await forward("/api/whik-business/portal/session", { code });
  if (res.status !== 200) return res;
  const json = await res.json();
  return setPortalCookie(NextResponse.json(json), json.client.code);
}
