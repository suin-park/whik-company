import { clearPortalCookie, forward, noSession, portalCode } from "@/lib/whikBusiness";

export const dynamic = "force-dynamic";

/** Quotes and contracts for the signed-in company. */
export async function GET() {
  const code = await portalCode();
  if (!code) return noSession();
  const res = await forward("/api/whik-business/portal/documents", { code });
  // Code was revoked or regenerated: drop the stale cookie.
  if (res.status === 404) return clearPortalCookie(res);
  return res;
}
