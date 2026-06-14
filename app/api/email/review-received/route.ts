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

    const { data: review } = await supabase
      .from("reviews")
      .select("*")
      .eq("order_id", orderId)
      .maybeSingle();

    if (!order || !review) {
      return NextResponse.json({ error: "Order or review not found" }, { status: 404 });
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
      await sendEmail({
        to: seller.email,
        subject: "You received a new review on ATHMOV",
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
            <h1>New review received</h1>
            <p>Hi ${seller.full_name || "there"},</p>
            <p>You received a <strong>${review.rating}-star review</strong> for <strong>${product?.title || "your item"}</strong>.</p>
            <p>${review.comment || ""}</p>
            <p>ATHMOV</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Review email failed" }, { status: 500 });
  }
}