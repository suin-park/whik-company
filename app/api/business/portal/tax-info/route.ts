import { NextRequest, NextResponse } from "next/server";
import { forward, noSession, portalCode, sameOrigin } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";

/** The signed-in company saves its tax invoice details. */
export async function POST(req: NextRequest) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  const code = await portalCode();
  if (!code) return noSession();
  const b = await req.json().catch(() => ({}));
  return forward("/api/whik-business/portal/tax-info", { code, taxInfo: b.taxInfo });
}
