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
    const body = await req.json();
    const orderId = body.orderId;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (!order.stripe_payment_intent) {
      return NextResponse.json(
        { error: "Missing payment intent" },
        { status: 400 }
      );
    }

    if (order.payment_status === "refunded") {
      return NextResponse.json({
        success: true,
        alreadyRefunded: true,
      });
    }

    const refund = await stripe.refunds.create({
      payment_intent: order.stripe_payment_intent,
    });

    await supabase
      .from("orders")
      .update({
        status: "refunded",
        payment_status: "refunded",
        transfer_status: "refunded",
        refunded_at: new Date().toISOString(),
        refund_amount: order.amount || 0,
        stripe_refund_id: refund.id,
      })
      .eq("id", order.id);

    return NextResponse.json({
      success: true,
      refundId: refund.id,
    });
  } catch (error: any) {
    console.log("REFUND ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Refund failed" },
      { status: 500 }
    );
  }
}