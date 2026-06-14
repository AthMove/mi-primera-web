import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    console.log("DISPUTE EMAIL API CALLED");
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
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
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

    if (seller?.email) {

        console.log("SENDING DISPUTE EMAIL TO:", seller.email);

      await sendEmail({
        to: seller.email,
        subject: "A dispute has been opened on ATHMOV",
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
            <h1>Dispute opened</h1>
            <p>Hi ${seller.full_name || "there"},</p>
            <p>A dispute has been opened for <strong>${product?.title || "your item"}</strong>.</p>
            <p><strong>Reason:</strong> ${order.dispute_reason || "No reason provided"}</p>
            <p>The payout is temporarily paused while ATHMOV reviews the case.</p>
            <p>Please check your Orders page for more details.</p>
            <p>ATHMOV</p>
          </div>
        `,
      });
      console.log("DISPUTE EMAIL SENT");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Dispute email failed" },
      { status: 500 }
    );
  }
}