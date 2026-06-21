import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLATFORM_FEE_PERCENT = 8;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const price = Number(body.price);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!price || price <= 0) {
      return NextResponse.json(
        { error: "Precio de oferta inválido" },
        { status: 400 }
      );
    }

    if (!body.orderId) {
      return NextResponse.json(
        { error: "Falta orderId" },
        { status: 400 }
      );
    }

    if (!body.stripeAccountId) {
      return NextResponse.json(
        { error: "El vendedor no ha conectado Stripe payouts" },
        { status: 400 }
      );
    }

    const platformFee = Number(
      ((price * PLATFORM_FEE_PERCENT) / 100).toFixed(2)
    );

    const sellerAmount = Number((price - platformFee).toFixed(2));

    const stripeFeeEstimate = Number((price * 0.015 + 0.25).toFixed(2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      payment_intent_data: {
        metadata: {
          order_id: body.orderId,
          offer_id: body.offerId || "",
          product_id: body.productId || "",
          seller_id: body.sellerId || "",
          buyer_id: body.buyerId || "",
          seller_stripe_account_id: body.stripeAccountId,
          checkout_type: "offer",
        },
      },

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: body.title || "Oferta ATHMOV",
              images: body.image?.startsWith("http") ? [body.image] : [],
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        order_id: body.orderId,
        offer_id: body.offerId || "",
        product_id: body.productId || "",
        seller_id: body.sellerId || "",
        buyer_id: body.buyerId || "",
        seller_stripe_account_id: body.stripeAccountId,
        amount: String(price),
        platform_fee_percent: String(PLATFORM_FEE_PERCENT),
        platform_fee: String(platformFee),
        seller_amount: String(sellerAmount),
        stripe_fee_estimate: String(stripeFeeEstimate),
        checkout_type: "offer",
      },

      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/messages/${body.conversationId || ""}`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      platformFee,
      sellerAmount,
      stripeFeeEstimate,
    });
  } catch (error: any) {
    console.log("STRIPE OFFER CHECKOUT ERROR:", error?.message || error);

    return NextResponse.json(
      { error: error?.message || "Error en checkout de oferta" },
      { status: 500 }
    );
  }
}