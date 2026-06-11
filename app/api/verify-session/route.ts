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
        { success: false, error: "Missing server environment variables" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();

    if (!body.sessionId) {
      return NextResponse.json(
        { success: false, error: "Missing sessionId" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(body.sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({
        success: false,
        error: "Payment not completed",
      });
    }

    const metadata = session.metadata;

    if (
      !metadata?.order_id ||
      !metadata?.product_id ||
      !metadata?.seller_id ||
      !metadata?.buyer_id
    ) {
      return NextResponse.json({
        success: false,
        error: "Missing metadata",
      });
    }

    const orderId = metadata.order_id;

    const { data: existingOrder } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("id", orderId)
      .maybeSingle();

    if (existingOrder) {
      const { error: updateOrderError } = await supabaseAdmin
        .from("orders")
        .update({
          stripe_session_id: body.sessionId,
          stripe_payment_intent: session.payment_intent,
          amount: Number(metadata.amount || 0),
          platform_fee: Number(metadata.platform_fee || 0),
          seller_amount: Number(metadata.seller_amount || 0),
          stripe_fee_estimate: Number(metadata.stripe_fee_estimate || 0),
          platform_fee_percent: Number(metadata.platform_fee_percent || 8),
          status: "paid",
          payment_status: "paid",
          transfer_status: "pending",
        })
        .eq("id", orderId);

      if (updateOrderError) {
        console.log("ORDER UPDATE ERROR:", updateOrderError);
      }
    } else {
      const { error: orderInsertError } = await supabaseAdmin
        .from("orders")
        .insert([
          {
            id: orderId,
            stripe_session_id: body.sessionId,
            stripe_payment_intent: session.payment_intent,
            product_id: metadata.product_id,
            seller_id: metadata.seller_id,
            buyer_id: metadata.buyer_id,
            amount: Number(metadata.amount || 0),
            platform_fee: Number(metadata.platform_fee || 0),
            seller_amount: Number(metadata.seller_amount || 0),
            stripe_fee_estimate: Number(metadata.stripe_fee_estimate || 0),
            platform_fee_percent: Number(metadata.platform_fee_percent || 8),
            status: "paid",
            payment_status: "paid",
            transfer_status: "pending",
          },
        ]);

      if (orderInsertError) {
        console.log("ORDER INSERT ERROR:", orderInsertError);
      }
    }

    await supabaseAdmin
      .from("products")
      .update({ sold: true })
      .eq("id", metadata.product_id);

    if (metadata.offer_id) {
      await supabaseAdmin
        .from("conversation_messages")
        .update({ offer_status: "accepted" })
        .eq("id", metadata.offer_id);
    }

    let conversationId = "";

    const { data: existingConversation } = await supabaseAdmin
      .from("conversations")
      .select("id")
      .eq("buyer_id", metadata.buyer_id)
      .eq("seller_id", metadata.seller_id)
      .eq("product_id", metadata.product_id)
      .maybeSingle();

    if (existingConversation?.id) {
      conversationId = existingConversation.id;
    } else {
      const { data: newConversation } = await supabaseAdmin
        .from("conversations")
        .insert([
          {
            buyer_id: metadata.buyer_id,
            seller_id: metadata.seller_id,
            product_id: metadata.product_id,
          },
        ])
        .select("id")
        .single();

      conversationId = newConversation?.id || "";
    }

    if (conversationId) {
      await supabaseAdmin.from("conversation_messages").insert([
        {
          conversation_id: conversationId,
          sender_id: metadata.buyer_id,
          content:
            metadata.checkout_type === "offer"
              ? "✅ Offer payment completed successfully. The order has started."
              : "✅ Payment completed successfully. The order has started.",
          is_image: false,
          is_offer: false,
          read_by_buyer: true,
          read_by_seller: false,
        },
      ]);
    }

    await supabaseAdmin.from("notifications").insert([
      {
        user_id: metadata.buyer_id,
        type: "order",
        title: "Payment successful",
        message: "Your order has been created successfully.",
        link: "/orders",
      },
      {
        user_id: metadata.seller_id,
        type: "sale",
        title: "New sale",
        message: "You received a new paid order.",
        link: "/orders",
      },
    ]);

    return NextResponse.json({
      success: true,
      metadata,
    });
  } catch (error) {
    console.log("VERIFY SESSION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}