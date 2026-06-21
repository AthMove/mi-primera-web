import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLATFORM_FEE_PERCENT = 8;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Faltan variables de entorno de Supabase" },
        { status: 500 }
      );
    }

    const price = Number(body.price);

    if (!price || price <= 0) {
      return NextResponse.json({ error: "Precio inválido" }, { status: 400 });
    }

    if (!body.productId || !body.sellerId || !body.buyerId) {
      return NextResponse.json(
        { error: "Faltan datos del pedido" },
        { status: 400 }
      );
    }

    if (!body.stripeAccountId) {
      return NextResponse.json(
        { error: "El vendedor no ha conectado Stripe payouts" },
        { status: 400 }
      );
    }

    const platformFee = Number(((price * PLATFORM_FEE_PERCENT) / 100).toFixed(2));
    const sellerAmount = Number((price - platformFee).toFixed(2));
    const stripeFeeEstimate = Number((price * 0.015 + 0.25).toFixed(2));

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: existingOrder } = await supabase
      .from("orders")
      .select("*")
      .eq("product_id", body.productId)
      .eq("buyer_id", body.buyerId)
      .eq("seller_id", body.sellerId)
      .eq("payment_status", "pending")
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
            platform_fee_percent: PLATFORM_FEE_PERCENT,
            platform_fee: platformFee,
            seller_amount: sellerAmount,
            stripe_fee_estimate: stripeFeeEstimate,
            seller_stripe_account_id: body.stripeAccountId,
            status: "pending",
            payment_status: "pending",
            transfer_status: "pending",
          },
        ])
        .select("*")
        .single();

      if (orderError || !newOrder) {
        return NextResponse.json(
          { error: orderError?.message || "No se pudo crear el pedido" },
          { status: 500 }
        );
      }

      order = newOrder;
    } else {
      await supabase
        .from("orders")
        .update({
          amount: price,
          platform_fee_percent: PLATFORM_FEE_PERCENT,
          platform_fee: platformFee,
          seller_amount: sellerAmount,
          stripe_fee_estimate: stripeFeeEstimate,
          seller_stripe_account_id: body.stripeAccountId,
        })
        .eq("id", order.id);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      payment_intent_data: {
        metadata: {
          order_id: order.id,
          product_id: body.productId,
          seller_id: body.sellerId,
          buyer_id: body.buyerId,
          seller_stripe_account_id: body.stripeAccountId,
          checkout_type: "product",
        },
      },

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: body.title || "Producto ATHMOV",
              images: body.image?.startsWith("http") ? [body.image] : [],
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
        checkout_type: "product",
      },

      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      orderId: order.id,
      platformFee,
      sellerAmount,
      stripeFeeEstimate,
    });
  } catch (error: any) {
    console.error("CHECKOUT ERROR:", error?.message || error);

    return NextResponse.json(
      { error: error?.message || "Error de Stripe checkout" },
      { status: 500 }
    );
  }
}