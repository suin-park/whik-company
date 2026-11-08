import { NextRequest, NextResponse } from "next/server";
import { forward, noSession, portalCode, sameOrigin } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Handwriting samples for the signed-in company: op read | save | list | delete (see 3D Locker portal/scan-samples). */
export async function POST(req: NextRequest) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  const code = await portalCode();
  if (!code) return noSession();
  const b = await req.json().catch(() => ({}));
  const op = String(b.op ?? "");
  if (!["read", "save", "list", "delete"].includes(op)) return NextResponse.json({ ok: false, error: "UNKNOWN_OP" }, { status: 400 });
  if (typeof b.image === "string" && b.image.length > 3_500_000) return NextResponse.json({ ok: false, error: "INVALID_IMAGE" }, { status: 400 });
  return forward("/api/whik-business/portal/scan-samples", { code, op, image: b.image, aiValues: b.aiValues, values: b.values, id: b.id });
}
