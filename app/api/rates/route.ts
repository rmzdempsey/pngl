import { NextResponse } from "next/server";

import { sendZohoMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const companyName = String(body.companyName ?? "").trim();
    const phone = String(body.companyPhone ?? "").trim();
    const message = String(body.companyMessage ?? "").trim();

    if (!companyName || !phone || !message) {
      return NextResponse.json(
        { error: "Company name, phone and message are required." },
        { status: 400 }
      );
    }

    await sendZohoMail({
      to: "sales@theproperty-network.com",
      from: "sales@theproperty-network.com",
      smtpUser: process.env.ZOHO_SMTP_USER_SALES ?? process.env.ZOHO_SMTP_USER,
      smtpPass: process.env.ZOHO_SMTP_PASS_SALES ?? process.env.ZOHO_SMTP_PASS,
      subject: "Rate enquiry",
      text: `Company name: ${companyName}\nPhone: ${phone}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Rate form error:", error);
    return NextResponse.json(
      {
        error:
          "Unable to send your rate enquiry right now. Please email sales@theproperty-network.com directly.",
      },
      { status: 500 }
    );
  }
}
