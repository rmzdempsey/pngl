import nodemailer from "nodemailer";

const {
  ZOHO_SMTP_HOST,
  ZOHO_SMTP_PORT,
  ZOHO_SMTP_USER,
  ZOHO_SMTP_PASS,
} = process.env;

export async function sendZohoMail({
  to,
  subject,
  text,
  from,
}: {
  to: string;
  subject: string;
  text: string;
  from?: string;
}) {
  if (!ZOHO_SMTP_HOST || !ZOHO_SMTP_PORT || !ZOHO_SMTP_USER || !ZOHO_SMTP_PASS) {
    throw new Error("Zoho SMTP environment variables are not configured.");
  }

  const transporter = nodemailer.createTransport({
    host: ZOHO_SMTP_HOST,
    port: Number(ZOHO_SMTP_PORT),
    secure: true,
    auth: {
      user: ZOHO_SMTP_USER,
      pass: ZOHO_SMTP_PASS,
    },
  });

  const mailFrom = from ?? ZOHO_SMTP_USER;

  await transporter.sendMail({
    from: mailFrom,
    to,
    subject,
    text,
  });
}
