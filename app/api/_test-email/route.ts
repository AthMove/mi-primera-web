import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      return NextResponse.json(
        { error: "Missing CRON_SECRET" },
        { status: 500 }
      );
    }

    const authHeader = req.headers.get("authorization");

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await sendEmail({
      to: "athmov@gmail.com",
      subject: "ATHMOV test email",
      html: `
        <h1>ATHMOV</h1>
        <p>Your email system is working correctly.</p>
        <p>${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error("EMAIL TEST ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Email test failed",
      },
      {
        status: 500,
      }
    );
  }
}