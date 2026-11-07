import { NextRequest, NextResponse } from "next/server";
import { forward, noSession, portalCode, sameOrigin } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  const code = await portalCode();
  if (!code) return noSession();
  const b = await req.json().catch(() => ({}));
  return forward(`/api/whik-business/portal/quotes/${encodeURIComponent(params.id)}/respond`, { code, decision: b.decision, name: b.name, note: b.note });
}
