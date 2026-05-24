import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.transfer_status === "paid") {
      return NextResponse.json({ error: "Order already paid out" }, { status: 400 });
    }

    if (order.status !== "completed") {
      return NextResponse.json({ error: "Order is not completed yet" }, { status: 400 });
    }

    if (!order.seller_stripe_account_id) {
      return NextResponse.json(
        { error: "Seller has no Stripe Connect account" },
        { status: 400 }
      );
    }

    const sellerAmount = Math.round(Number(order.seller_amount) * 100);

    if (!sellerAmount || sellerAmount <= 0) {
      return NextResponse.json({ error: "Invalid seller amount" }, { status: 400 });
    }

    const transfer = await stripe.transfers.create({
      amount: sellerAmount,
      currency: "eur",
      destination: order.seller_stripe_account_id,
      transfer_group: `ORDER_${order.id}`,
      metadata: {
        order_id: order.id,
        seller_id: order.seller_id,
        platform: "ATHMOV",
      },
    });

    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        transfer_status: "paid",
        stripe_transfer_id: transfer.id,
        paid_out_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      transferId: transfer.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Release payment failed" },
      { status: 500 }
    );
  }
}