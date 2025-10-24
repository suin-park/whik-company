import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(1).max(5000),
  // honeypot
  website: z.string().max(0).optional().or(z.literal("")), 
});

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 465),
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.safeParse(body);
    if (!data.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const { name, email, company, message, website } = data.data;
    if (website) {
      // bot trap
      return NextResponse.json({ ok: true });
    }

    const to = process.env.MAIL_TO || process.env.MAIL_USER!;
    const site = process.env.SITE_NAME || "Website";

    const html = `
      <h2>New contact from ${site}</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Company:</b> ${escapeHtml(company || "-")}</p>
      <p><b>Message:</b></p>
      <pre style="white-space:pre-wrap;font:inherit">${escapeHtml(message)}</pre>
    `;

    await transporter.sendMail({
      from: `"${site} Contact" <${process.env.MAIL_USER}>`,
      to,
      subject: `[${site}] New contact from ${name}`,
      replyTo: email,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact api error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

// 아주 간단한 escape
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}