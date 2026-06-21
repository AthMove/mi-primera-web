import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return null;
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "ATHMOV <orders@athmov.com>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
    return null;
  }
}