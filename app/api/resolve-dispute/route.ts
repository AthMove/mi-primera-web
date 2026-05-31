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
    const resolution = body.resolution;

    if (!orderId || !resolution) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (resolution === "seller_wins") {
      await supabase
        .from("orders")
        .update({
          status: "completed",
          dispute_status: "resolved",
          dispute_resolved_at: new Date().toISOString(),
          dispute_resolution: "seller_wins",
        })
        .eq("id", order.id);
    }

    if (resolution === "buyer_refund") {
      if (!order.stripe_payment_intent) {
        return NextResponse.json(
          { error: "Payment intent missing" },
          { status: 400 }
        );
      }

      await stripe.refunds.create({
        payment_intent: order.stripe_payment_intent,
      });

      await supabase
        .from("orders")
        .update({
          status: "refunded",
          refund_status: "refunded",
          dispute_status: "resolved",
          dispute_resolved_at: new Date().toISOString(),
          dispute_resolution: "buyer_refund",
        })
        .eq("id", order.id);
    }

    await supabase.from("notifications").insert([
      {
        user_id: order.buyer_id,
        type: "dispute",
        title: "Dispute resolved",
        message:
          resolution === "buyer_refund"
            ? "Your refund has been approved."
            : "The payout was released to the seller.",
        link: "/orders",
      },
      {
        user_id: order.seller_id,
        type: "dispute",
        title: "Dispute resolved",
        message:
          resolution === "seller_wins"
            ? "Your payout has been released."
            : "The buyer refund was approved.",
        link: "/orders",
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log("RESOLVE DISPUTE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Resolve failed" },
      { status: 500 }
    );
  }
}