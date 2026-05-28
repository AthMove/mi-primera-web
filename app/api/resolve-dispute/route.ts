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

    const disputeId = body.disputeId;
    const resolution = body.resolution;

    if (!disputeId || !resolution) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const { data: dispute, error: disputeError } = await supabase
      .from("disputes")
      .select(`
        *,
        orders (*)
      `)
      .eq("id", disputeId)
      .single();

    if (disputeError || !dispute) {
      return NextResponse.json(
        { error: "Dispute not found" },
        { status: 404 }
      );
    }

    const order = dispute.orders;

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // SELLER WINS
    if (resolution === "seller_wins") {
      const payoutResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/release-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: order.id,
          }),
        }
      );

      const payoutData = await payoutResponse.json();

      if (!payoutResponse.ok) {
        return NextResponse.json(
          { error: payoutData.error || "Payout failed" },
          { status: 500 }
        );
      }

      await supabase
        .from("orders")
        .update({
          status: "completed",
          dispute_status: "resolved",
          completed_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      await supabase
        .from("disputes")
        .update({
          status: "resolved",
          resolution: "seller_wins",
          resolved_at: new Date().toISOString(),
        })
        .eq("id", dispute.id);
    }

    // BUYER REFUND
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
          dispute_status: "resolved",
        })
        .eq("id", order.id);

      await supabase
        .from("disputes")
        .update({
          status: "resolved",
          resolution: "buyer_refund",
          resolved_at: new Date().toISOString(),
        })
        .eq("id", dispute.id);
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

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.log("RESOLVE DISPUTE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Resolve failed" },
      { status: 500 }
    );
  }
}