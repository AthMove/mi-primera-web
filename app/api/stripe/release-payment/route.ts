import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { orderId } = await req.json();

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

    if (
      order.transfer_status === "released" ||
      order.transfer_status === "paid" ||
      order.stripe_transfer_id
    ) {
      return NextResponse.json({
        success: true,
        alreadyReleased: true,
        transferId: order.stripe_transfer_id,
      });
    }

    if (order.status !== "completed") {
      return NextResponse.json(
        { error: "Order is not completed yet" },
        { status: 400 }
      );
    }

    if (order.dispute_status === "open") {
      return NextResponse.json(
        { error: "Order has an open dispute" },
        { status: 400 }
      );
    }

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
      metadata: {
        order_id: order.id,
        seller_id: order.seller_id,
      },
    });

    await supabase
      .from("orders")
      .update({
        status: "completed",
        transfer_status: "released",
        payout_released_at: new Date().toISOString(),
        stripe_transfer_id: transfer.id,
      })
      .eq("id", order.id);

    return NextResponse.json({
      success: true,
      transferId: transfer.id,
    });
  } catch (error: any) {
    console.log("RELEASE PAYMENT ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Release payment error" },
      { status: 500 }
    );
  }
}