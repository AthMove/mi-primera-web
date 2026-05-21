import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await stripe.checkout.sessions.retrieve(
      body.sessionId
    );

    if (session.payment_status !== "paid") {
      return NextResponse.json({ success: false });
    }

    const metadata = session.metadata;

    if (
      !metadata?.product_id ||
      !metadata?.seller_id ||
      !metadata?.buyer_id
    ) {
      return NextResponse.json({ success: false });
    }

    const { data: existingOrder } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("stripe_session_id", body.sessionId)
      .maybeSingle();

    if (!existingOrder) {

      // CREATE ORDER

      await supabaseAdmin
        .from("orders")
        .insert([
          {
            stripe_session_id: body.sessionId,

            product_id: metadata.product_id,
            seller_id: metadata.seller_id,
            buyer_id: metadata.buyer_id,

            amount: Number(metadata.amount),

            platform_fee: Number(metadata.platform_fee || 0),

            seller_amount: Number(
              metadata.seller_amount || 0
            ),

            stripe_fee_estimate: Number(
              metadata.stripe_fee_estimate || 0
            ),

            platform_fee_percent: Number(
              metadata.platform_fee_percent || 8
            ),

            status: "paid",
          },
        ]);

      // MARK PRODUCT AS SOLD

      await supabaseAdmin
        .from("products")
        .update({
          sold: true,
        })
        .eq("id", metadata.product_id);

      // CREATE OR GET CONVERSATION

      let conversationId = "";

      const { data: existingConversation } =
        await supabaseAdmin
          .from("conversations")
          .select("id")
          .eq("buyer_id", metadata.buyer_id)
          .eq("seller_id", metadata.seller_id)
          .eq("product_id", metadata.product_id)
          .maybeSingle();

      if (existingConversation?.id) {
        conversationId = existingConversation.id;
      } else {
        const { data: newConversation } =
          await supabaseAdmin
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

      // SYSTEM MESSAGE

      if (conversationId) {
        await supabaseAdmin
          .from("conversation_messages")
          .insert([
            {
              conversation_id: conversationId,

              sender_id: metadata.buyer_id,

              content:
                "✅ Payment completed successfully. The order has started.",

              is_image: false,
              is_offer: false,

              read_by_buyer: true,
              read_by_seller: false,
            },
          ]);
      }
    }

    return NextResponse.json({
      success: true,
      metadata,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}