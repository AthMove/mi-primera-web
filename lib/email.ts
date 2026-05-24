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
  if (!process.env.RESEND_API_KEY) {
    console.log("Missing RESEND_API_KEY");
    return;
  }

  return await resend.emails.send({
    from: "ATHMOV <no-reply@athmov.com>",
    to,
    subject,
    html,
  });
}