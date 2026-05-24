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
      return NextResponse.json(
        { error: "Missing orderId" },
        { status: 400 }
      );
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (!order.stripe_payment_intent) {
      return NextResponse.json(
        { error: "Missing payment intent" },
        { status: 400 }
      );
    }

    if (
      order.transfer_status === "paid" ||
      order.transfer_status === "released"
    ) {
      return NextResponse.json({
        success: true,
        alreadyReleased: true,
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      order.stripe_payment_intent
    );

    if (!paymentIntent.latest_charge) {
      return NextResponse.json(
        { error: "Charge not found" },
        { status: 400 }
      );
    }

    await supabase
      .from("orders")
      .update({
        transfer_status: "released",
        payout_released_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.log("RELEASE PAYMENT ERROR:", error?.message || error);

    return NextResponse.json(
      { error: error.message || "Release payment failed" },
      { status: 500 }
    );
  }
}