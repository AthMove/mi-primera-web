import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { translations } from "@/lib/i18n";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Language = "es" | "en" | "pt";

const normalizeLanguage = (
  language?: string | null
): Language => {
  if (language === "en") return "en";
  if (language === "pt") return "pt";
  return "es";
};

export async function POST(req: Request) {
  try {
    const stripeSecretKey =
      process.env.STRIPE_SECRET_KEY;
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      !stripeSecretKey ||
      !supabaseUrl ||
      !serviceRoleKey
    ) {
      return NextResponse.json(
        {
          error:
            "Faltan variables de entorno del servidor",
        },
        { status: 500 }
      );
    }

    const stripe = new Stripe(
      stripeSecretKey
    );

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    const { orderId, reason } =
      await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Falta orderId" },
        { status: 400 }
      );
    }

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        {
          error:
            "Pedido no encontrado",
        },
        { status: 404 }
      );
    }

    if (!order.stripe_payment_intent) {
      return NextResponse.json(
        {
          error:
            "El pedido no tiene payment intent",
        },
        { status: 400 }
      );
    }

    if (
      order.payment_status === "refunded" ||
      order.stripe_refund_id
    ) {
      return NextResponse.json(
        {
          error:
            "El pedido ya ha sido reembolsado",
        },
        { status: 400 }
      );
    }

    if (
      order.transfer_status === "released" ||
      order.stripe_transfer_id
    ) {
      return NextResponse.json(
        {
          error:
            "El pago al vendedor ya ha sido liberado. Requiere revisión manual.",
        },
        { status: 400 }
      );
    }

    const refund =
      await stripe.refunds.create({
        payment_intent:
          order.stripe_payment_intent,
        reason:
          "requested_by_customer",
        metadata: {
          order_id: order.id,
          buyer_id:
            order.buyer_id || "",
          seller_id:
            order.seller_id || "",
          reason:
            reason || "ATHMOV refund",
        },
      });

    const refundAmount = Number(
      (refund.amount / 100).toFixed(2)
    );

    const { error: updateError } =
      await supabase
        .from("orders")
        .update({
          status: "refunded",
          payment_status: "refunded",
          transfer_status: "cancelled",
          refund_status:
            refund.status || "refunded",
          stripe_refund_id:
            refund.id,
          refunded_at:
            new Date().toISOString(),
          refund_amount:
            refundAmount,
        })
        .eq("id", order.id);

    if (updateError) {
      return NextResponse.json(
        {
          error:
            updateError.message,
        },
        { status: 500 }
      );
    }

    const [
      buyerProfileResult,
      sellerProfileResult,
    ] = await Promise.all([
      supabase
        .from("profiles")
        .select(
          "preferred_language"
        )
        .eq("id", order.buyer_id)
        .maybeSingle(),

      supabase
        .from("profiles")
        .select(
          "preferred_language"
        )
        .eq("id", order.seller_id)
        .maybeSingle(),
    ]);

    const buyerLang =
      normalizeLanguage(
        buyerProfileResult.data
          ?.preferred_language
      );

    const sellerLang =
      normalizeLanguage(
        sellerProfileResult.data
          ?.preferred_language
      );

    const buyerT =
      translations[buyerLang];

    const sellerT =
      translations[sellerLang];

    await supabase
      .from("notifications")
      .insert([
        {
          user_id:
            order.buyer_id,
          type: "refund",
          title:
            buyerT.refundApprovedNotificationTitle,
          message:
            buyerT.refundApprovedNotificationMessage,
          link: "/orders",
          is_read: false,
        },
        {
          user_id:
            order.seller_id,
          type: "refund",
          title:
            sellerT.orderRefundedNotificationTitle,
          message:
            sellerT.orderRefundedNotificationMessage,
          link: "/orders",
          is_read: false,
        },
      ]);

    return NextResponse.json({
      success: true,
      refundId: refund.id,
      status: refund.status,
      amount: refundAmount,
    });
  } catch (error: any) {
    console.log(
      "REFUND ERROR:",
      error?.message || error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Error al realizar el reembolso",
      },
      { status: 500 }
    );
  }
}