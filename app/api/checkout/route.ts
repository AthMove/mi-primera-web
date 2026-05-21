import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PLATFORM_FEE_PERCENT = 8;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const price = Number(body.price);

    if (!price || price <= 0) {
      return NextResponse.json(
        { error: "Invalid price" },
        { status: 400 }
      );
    }

    if (!body.stripeAccountId) {
      return NextResponse.json(
        { error: "Seller has not connected Stripe payouts" },
        { status: 400 }
      );
    }

    const platformFee = Number(
      ((price * PLATFORM_FEE_PERCENT) / 100).toFixed(2)
    );

    const sellerAmount = Number((price - platformFee).toFixed(2));

    const stripeFeeEstimate = Number(
      (price * 0.015 + 0.25).toFixed(2)
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      payment_intent_data: {
        application_fee_amount: Math.round(platformFee * 100),
        transfer_data: {
          destination: body.stripeAccountId,
        },
      },

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: body.title,
              images: body.image?.startsWith("http")
                ? [body.image]
                : [],
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        product_id: body.productId,
        seller_id: body.sellerId,
        buyer_id: body.buyerId,
        stripe_account_id: body.stripeAccountId,

        amount: String(price),
        platform_fee_percent: String(PLATFORM_FEE_PERCENT),
        platform_fee: String(platformFee),
        seller_amount: String(sellerAmount),
        stripe_fee_estimate: String(stripeFeeEstimate),
      },

      success_url: `${body.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${body.origin}/products/${body.productId}`,
    });

    return NextResponse.json({
      url: session.url,
      platformFee,
      sellerAmount,
      stripeFeeEstimate,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Stripe error" },
      { status: 500 }
    );
  }
}