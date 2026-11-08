import { NextRequest, NextResponse } from "next/server";
import { callUpstream, noSession, portalCode } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";

/** WHIK business registration / bank account copy as a PDF download, for signed-in companies only. */
export async function GET(req: NextRequest) {
  const code = await portalCode();
  if (!code) return noSession();
  const file = req.nextUrl.searchParams.get("f") ?? "";
  if (!/^[a-z]{1,20}$/.test(file)) return NextResponse.json({ ok: false, error: "UNKNOWN_FILE" }, { status: 404 });
  const { status, json } = await callUpstream("/api/whik-business/portal/company-file", { code, file });
  if (!json.ok || typeof json.base64 !== "string") return NextResponse.json(json, { status: status === 200 ? 502 : status });
  const filename = String(json.filename || "whik.pdf");
  return new NextResponse(Buffer.from(json.base64, "base64"), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="whik.pdf"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
