import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  try {
    const { orderId, reason } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (!order.stripe_payment_intent) {
      return NextResponse.json(
        { error: "Order has no payment intent" },
        { status: 400 }
      );
    }

    if (order.payment_status === "refunded") {
      return NextResponse.json(
        { error: "Order already refunded" },
        { status: 400 }
      );
    }

    if (order.transfer_status === "paid") {
      return NextResponse.json(
        { error: "Seller has already been paid. Manual dispute required." },
        { status: 400 }
      );
    }

    const refund = await stripe.refunds.create({
      payment_intent: order.stripe_payment_intent,
      reason: "requested_by_customer",
      metadata: {
        order_id: order.id,
        buyer_id: order.buyer_id,
        seller_id: order.seller_id,
        reason: reason || "ATHMOV refund",
      },
    });

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "refunded",
        payment_status: "refunded",
        refund_status: refund.status,
        stripe_refund_id: refund.id,
        refunded_at: new Date().toISOString(),
        refund_amount: refund.amount / 100,
      })
      .eq("id", order.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      refundId: refund.id,
      status: refund.status,
    });
  } catch (error: any) {
    console.log("REFUND ERROR:", error?.message || error);

    return NextResponse.json(
      { error: error?.message || "Refund failed" },
      { status: 500 }
    );
  }
}