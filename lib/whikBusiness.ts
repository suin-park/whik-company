// Server-only bridge from whik.co.kr to the 3D Locker business API.
// The shared key stays on the server; the browser never talks to 3D Locker directly.
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export const PORTAL_COOKIE = "whik_portal";
const PORTAL_MAX_AGE = 8 * 60 * 60; // 8 hours

function apiBase() {
  return (process.env.WHIK_BUSINESS_API_URL || "https://3d-locker.com").replace(/\/$/, "");
}

/** Visitor IP / UA as seen by this server (Vercel sets x-forwarded-for). */
export async function visitor() {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  return { ip: ip.slice(0, 64), userAgent: (h.get("user-agent") || "").slice(0, 400) };
}

/** Calls 3D Locker and passes its JSON (and status) straight back. */
export async function forward(path: string, body: Record<string, unknown>) {
  const key = process.env.WHIK_BUSINESS_API_KEY;
  if (!key) return NextResponse.json({ ok: false, error: "NOT_CONFIGURED" }, { status: 503 });
  const v = await visitor();
  try {
    const res = await fetch(`${apiBase()}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-whik-business-key": key },
      body: JSON.stringify({ ...body, ip: v.ip, userAgent: v.userAgent }),
      cache: "no-store",
    });
    const json = await res.json().catch(() => ({ ok: false, error: "BAD_UPSTREAM" }));
    return NextResponse.json(json, { status: res.status });
  } catch (e) {
    console.error("[business] upstream error", path, e);
    return NextResponse.json({ ok: false, error: "UPSTREAM_UNREACHABLE" }, { status: 502 });
  }
}

export async function portalCode() {
  return (await cookies()).get(PORTAL_COOKIE)?.value ?? null;
}

export function setPortalCookie(res: NextResponse, code: string) {
  res.cookies.set(PORTAL_COOKIE, code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PORTAL_MAX_AGE,
  });
  return res;
}

export function clearPortalCookie(res: NextResponse) {
  res.cookies.set(PORTAL_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

export const noSession = () => NextResponse.json({ ok: false, error: "NO_SESSION" }, { status: 401 });

/** Same-origin check for state-changing portal calls (cookie auth). */
export async function sameOrigin() {
  const h = await headers();
  const origin = h.get("origin");
  if (!origin) return true; // same-origin fetch from older browsers / server
  const host = h.get("x-forwarded-host") || h.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
