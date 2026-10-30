import { NextResponse } from "next/server";

import { sendZohoMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const businessName = String(body.businessName ?? "").trim();
    const contactEmail = String(body.businessEmail ?? "").trim();
    const message = String(body.businessMessage ?? "").trim();

    if (!businessName || !contactEmail || !message) {
      return NextResponse.json(
        { error: "Business name, contact email and message are required." },
        { status: 400 }
      );
    }

    await sendZohoMail({
      to: "info@theproperty-network.com",
      from: "info@theproperty-network.com",
      subject: "Brochure enquiry",
      text: `Business name: ${businessName}\nContact email: ${contactEmail}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error:
          "Unable to send your enquiry right now. Please email info@theproperty-network.com directly.",
      },
      { status: 500 }
    );
  }
}
