import { NextResponse } from "next/server";
import { forward, noSession, portalCode, sameOrigin } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  const code = await portalCode();
  if (!code) return noSession();
  return forward(`/api/whik-business/portal/contracts/${encodeURIComponent(id)}/view`, { code });
}
