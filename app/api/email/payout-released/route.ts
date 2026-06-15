import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    const { data: product } = await supabase
      .from("products")
      .select("title")
      .eq("id", order.product_id)
      .maybeSingle();

    const { data: seller } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", order.seller_id)
      .maybeSingle();

    if (!seller?.email) {
      return NextResponse.json(
        { error: "Seller email not found" },
        { status: 404 }
      );
    }

    await sendEmail({
      to: seller.email,
      subject: "Your ATHMOV payout has been released",
      html: `
        <div style="font-family: Arial,sans-serif;color:#111;line-height:1.6;">
          <h1>Payout released</h1>

          <p>Hi ${seller.full_name || "there"},</p>

          <p>
            The payout for
            <strong>${product?.title || "your item"}</strong>
            has been released.
          </p>

          <p>
            Funds will arrive in your connected Stripe account
            according to Stripe processing times.
          </p>

          <p>Thank you for selling on ATHMOV.</p>

          <p>ATHMOV</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Payout email failed" },
      { status: 500 }
    );
  }
}