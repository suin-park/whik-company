import { NextRequest, NextResponse } from "next/server";
import { forward, sameOrigin } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Demo entry-ticket scan: one photo (base64 JPEG/PNG, resized in the browser) → 3D Locker handwriting reader. Nothing is stored. */
export async function POST(req: NextRequest) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  const body = (await req.json().catch(() => null)) as { image?: unknown } | null;
  const image = typeof body?.image === "string" ? body.image : "";
  if (!image || image.length > 3_500_000) return NextResponse.json({ ok: false, error: "INVALID_IMAGE" }, { status: 400 });
  return forward("/api/whik-business/demo/entry-scan", { image });
}
