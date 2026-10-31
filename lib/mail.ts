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
  smtpUser,
  smtpPass,
}: {
  to: string;
  subject: string;
  text: string;
  from?: string;
  smtpUser?: string;
  smtpPass?: string;
}) {
  const effectiveSmtpUser = smtpUser ?? ZOHO_SMTP_USER;
  const effectiveSmtpPass = smtpPass ?? ZOHO_SMTP_PASS;

  if (
    !ZOHO_SMTP_HOST ||
    !ZOHO_SMTP_PORT ||
    !effectiveSmtpUser ||
    !effectiveSmtpPass
  ) {
    throw new Error("Zoho SMTP environment variables are not configured.");
  }

  const transporter = nodemailer.createTransport({
    host: ZOHO_SMTP_HOST,
    port: Number(ZOHO_SMTP_PORT),
    secure: true,
    auth: {
      user: effectiveSmtpUser,
      pass: effectiveSmtpPass,
    },
  });

  const mailFrom = from ?? effectiveSmtpUser;

  await transporter.sendMail({
    from: mailFrom,
    to,
    subject,
    text,
  });
}
