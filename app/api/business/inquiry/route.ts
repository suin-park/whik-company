import { NextRequest, NextResponse } from "next/server";
import { forward, sameOrigin } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";

/** Development / training request form → 3D Locker admin (+ email to the team). */
export async function POST(req: NextRequest) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  // Honeypot: bots fill every field.
  if (body.website) return NextResponse.json({ ok: true });
  const { kind, companyName, contactName, email, phone, message, details } = body as Record<string, unknown>;
  return forward("/api/whik-business/inquiries", { kind, companyName, contactName, email, phone, message, details });
}
