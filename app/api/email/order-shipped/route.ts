import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
    console.log("ORDER SHIPPED EMAIL API CALLED");
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
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const { data: product } = await supabase
      .from("products")
      .select("title")
      .eq("id", order.product_id)
      .maybeSingle();

    const { data: buyer } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", order.buyer_id)
      .maybeSingle();

    if (!buyer?.email) {
      return NextResponse.json({ error: "Buyer email not found" }, { status: 404 });
    }

    await sendEmail({
      to: buyer.email,
      subject: "Your ATHMOV order has been shipped",
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h1>Order shipped</h1>
          <p>Hi ${buyer.full_name || "there"},</p>
          <p>Your order for <strong>${product?.title || "your item"}</strong> has been shipped.</p>
          <p><strong>Carrier:</strong> ${order.carrier || "Carrier"}</p>
          <p><strong>Tracking:</strong> ${order.tracking_number || "Tracking number"}</p>
          <p>You can track your order from your ATHMOV account.</p>
          <p>ATHMOV</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Email failed" },
      { status: 500 }
    );
  }
}