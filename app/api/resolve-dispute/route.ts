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
    const { orderId, resolution } = await req.json();

    if (!orderId || !resolution) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!["seller_wins", "buyer_refund"].includes(resolution)) {
      return NextResponse.json({ error: "Invalid resolution" }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

   if (order.dispute_resolution || order.dispute_resolved_at) {
  return NextResponse.json(
    { error: "Dispute has already been resolved" },
    { status: 400 }
  );
}

    if (order.stripe_refund_id || order.refund_status === "refunded") {
      return NextResponse.json(
        { error: "Order has already been refunded" },
        { status: 400 }
      );
    }

    if (
      resolution === "buyer_refund" &&
      (order.transfer_status === "released" || order.stripe_transfer_id)
    ) {
      return NextResponse.json(
        { error: "Seller payout has already been released" },
        { status: 400 }
      );
    }

    if (resolution === "seller_wins") {
      if (order.transfer_status === "released" || order.stripe_transfer_id) {
        await supabase
          .from("orders")
          .update({
            status: "completed",
            dispute_status: "resolved",
            dispute_resolved_at: new Date().toISOString(),
            dispute_resolution: "seller_wins",
          })
          .eq("id", order.id);
      } else {
        const sellerAmount = Math.round(Number(order.seller_amount || 0) * 100);

        if (!sellerAmount || sellerAmount <= 0) {
          return NextResponse.json(
            { error: "Invalid seller amount" },
            { status: 400 }
          );
        }

        if (!order.seller_stripe_account_id) {
          return NextResponse.json(
            { error: "Missing seller Stripe account" },
            { status: 400 }
          );
        }

       const transfer = await stripe.transfers.create({
  amount: sellerAmount,
  currency: "eur",
  destination: order.seller_stripe_account_id,
  transfer_group: `order_${order.id}`,
  metadata: {
    order_id: order.id,
    seller_id: order.seller_id,
    dispute_resolution: "seller_wins",
  },
});

        await supabase
          .from("orders")
          .update({
            status: "completed",
            transfer_status: "released",
            payout_released_at: new Date().toISOString(),
            stripe_transfer_id: transfer.id,
            dispute_status: "resolved",
            dispute_resolved_at: new Date().toISOString(),
            dispute_resolution: "seller_wins",
          })
          .eq("id", order.id);
      }
    }

    if (resolution === "buyer_refund") {
      if (!order.stripe_payment_intent) {
        return NextResponse.json(
          { error: "Payment intent missing" },
          { status: 400 }
        );
      }

      const refund = await stripe.refunds.create({
        payment_intent: order.stripe_payment_intent,
      });

      await supabase
        .from("orders")
        .update({
          status: "refunded",
          payment_status: "refunded",
          transfer_status: "cancelled",
          refund_status: "refunded",
          stripe_refund_id: refund.id,
          refunded_at: new Date().toISOString(),
          refund_amount: order.amount || null,
          dispute_status: "resolved",
          dispute_resolved_at: new Date().toISOString(),
          dispute_resolution: "buyer_refund",
        })
        .eq("id", order.id);
    }

await supabase
  .from("disputes")
  .update({
    status: "resolved",
    resolution,
    resolved_at: new Date().toISOString(),
  })
  .eq("order_id", order.id)
  .eq("status", "open");

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

    const { data: finalOrder } = await supabase
  .from("orders")
  .select(
    "id, status, dispute_status, dispute_resolution, dispute_resolved_at, transfer_status, refund_status, stripe_transfer_id, stripe_refund_id"
  )
  .eq("id", order.id)
  .single();

if (!finalOrder || finalOrder.dispute_status !== "resolved") {
  return NextResponse.json(
    {
      error: "Dispute update verification failed",
      order: finalOrder,
    },
    { status: 500 }
  );
}

return NextResponse.json({
  success: true,
  order: finalOrder,
});
  } catch (error: any) {
    console.log("RESOLVE DISPUTE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Resolve failed" },
      { status: 500 }
    );
  }
}