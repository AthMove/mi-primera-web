import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!stripeSecretKey || !supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Missing server environment variables" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

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

    if (order.transfer_status === "released") {
      return NextResponse.json(
        { error: "Order already paid out" },
        { status: 400 }
      );
    }

    if (order.dispute_status === "open") {
  return NextResponse.json(
    { error: "Order has an active dispute" },
    { status: 400 }
  );
}

    if (!order.seller_stripe_account_id) {
      return NextResponse.json(
        { error: "Seller has no Stripe Connect account" },
        { status: 400 }
      );
    }

    const sellerAmount = Math.round(Number(order.seller_amount) * 100);

    if (!sellerAmount || sellerAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid seller amount" },
        { status: 400 }
      );
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
    transfer_status: "released",
    stripe_transfer_id: transfer.id,
    payout_released_at: new Date().toISOString(),
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