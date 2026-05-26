import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
 import { createClient } from "@supabase/supabase-js";

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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

const { data: existingOrder } = await supabase
  .from("orders")
  .select("*")
  .eq("product_id", body.productId)
  .eq("buyer_id", body.buyerId)
  .eq("seller_id", body.sellerId)
  .in("status", ["pending", "paid"])
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();

let order = existingOrder;

if (!order) {
  const { data: newOrder, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        product_id: body.productId,
        seller_id: body.sellerId,
        buyer_id: body.buyerId,
        amount: price,
        status: "pending",
        payment_status: "pending",
        transfer_status: "pending",
        seller_stripe_account_id: body.stripeAccountId,
      },
    ])
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  order = newOrder;
}

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      payment_intent_data: {
        application_fee_amount: Math.round(platformFee * 100),
        transfer_data: {
          destination: body.stripeAccountId,
        },
        metadata: {
  order_id: order.id,
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
  order_id: order.id,
  product_id: body.productId,
  seller_id: body.sellerId,
  buyer_id: body.buyerId,
  seller_stripe_account_id: body.stripeAccountId,
  amount: String(price),
  platform_fee_percent: String(PLATFORM_FEE_PERCENT),
  platform_fee: String(platformFee),
  seller_amount: String(sellerAmount),
  stripe_fee_estimate: String(stripeFeeEstimate),
},

success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
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