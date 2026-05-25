import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET() {
  try {
    await sendEmail({
      to: "athmov@gmail.com",
      subject: "ATHMOV test email",
      html: `
        <h1>ATHMOV</h1>
        <p>Your email system is working correctly.</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}