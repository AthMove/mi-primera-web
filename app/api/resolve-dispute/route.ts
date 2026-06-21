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
        { error: "Faltan variables de entorno del servidor" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { orderId, resolution } = await req.json();

    if (!orderId || !resolution) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    if (!["seller_wins", "buyer_refund"].includes(resolution)) {
      return NextResponse.json(
        { error: "Resolución no válida" },
        { status: 400 }
      );
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    if (order.dispute_resolution || order.dispute_resolved_at) {
      return NextResponse.json(
        { error: "La disputa ya ha sido resuelta" },
        { status: 400 }
      );
    }

    if (order.stripe_refund_id || order.refund_status === "refunded") {
      return NextResponse.json(
        { error: "El pedido ya ha sido reembolsado" },
        { status: 400 }
      );
    }

    if (
      resolution === "buyer_refund" &&
      (order.transfer_status === "released" || order.stripe_transfer_id)
    ) {
      return NextResponse.json(
        { error: "El pago al vendedor ya ha sido liberado" },
        { status: 400 }
      );
    }

    if (resolution === "seller_wins") {
      if (order.transfer_status === "released" || order.stripe_transfer_id) {
        await supabase
          .from("orders")
          .update({
            status: "completed",
            dispute_status: "resolved",
            dispute_resolved_at: new Date().toISOString(),
            dispute_resolution: "seller_wins",
          })
          .eq("id", order.id);
      } else {
        const sellerAmount = Math.round(Number(order.seller_amount || 0) * 100);

        if (!sellerAmount || sellerAmount <= 0) {
          return NextResponse.json(
            { error: "Importe del vendedor no válido" },
            { status: 400 }
          );
        }

        if (!order.seller_stripe_account_id) {
          return NextResponse.json(
            { error: "Falta la cuenta de Stripe del vendedor" },
            { status: 400 }
          );
        }

        const transfer = await stripe.transfers.create({
          amount: sellerAmount,
          currency: "eur",
          destination: order.seller_stripe_account_id,
          transfer_group: `order_${order.id}`,
          metadata: {
            order_id: order.id,
            seller_id: order.seller_id,
            dispute_resolution: "seller_wins",
          },
        });

        await supabase
          .from("orders")
          .update({
            status: "completed",
            transfer_status: "released",
            payout_released_at: new Date().toISOString(),
            stripe_transfer_id: transfer.id,
            dispute_status: "resolved",
            dispute_resolved_at: new Date().toISOString(),
            dispute_resolution: "seller_wins",
          })
          .eq("id", order.id);
      }
    }

    if (resolution === "buyer_refund") {
      if (!order.stripe_payment_intent) {
        return NextResponse.json(
          { error: "Falta el Payment Intent" },
          { status: 400 }
        );
      }

      const refund = await stripe.refunds.create({
        payment_intent: order.stripe_payment_intent,
      });

      await supabase
        .from("orders")
        .update({
          status: "refunded",
          payment_status: "refunded",
          transfer_status: "cancelled",
          refund_status: "refunded",
          stripe_refund_id: refund.id,
          refunded_at: new Date().toISOString(),
          refund_amount: order.amount || null,
          dispute_status: "resolved",
          dispute_resolved_at: new Date().toISOString(),
          dispute_resolution: "buyer_refund",
        })
        .eq("id", order.id);
    }

    await supabase
      .from("disputes")
      .update({
        status: "resolved",
        resolution,
        resolved_at: new Date().toISOString(),
      })
      .eq("order_id", order.id)
      .eq("status", "open");

    await supabase.from("notifications").insert([
      {
        user_id: order.buyer_id,
        type: "dispute",
        title: "Disputa resuelta",
        message:
          resolution === "buyer_refund"
            ? "Tu reembolso ha sido aprobado."
            : "El pago ha sido liberado al vendedor.",
        link: "/orders",
      },
      {
        user_id: order.seller_id,
        type: "dispute",
        title: "Disputa resuelta",
        message:
          resolution === "seller_wins"
            ? "Tu pago ha sido liberado."
            : "El reembolso al comprador ha sido aprobado.",
        link: "/orders",
      },
    ]);

    const { data: finalOrder } = await supabase
      .from("orders")
      .select(
        "id, status, dispute_status, dispute_resolution, dispute_resolved_at, transfer_status, refund_status, stripe_transfer_id, stripe_refund_id"
      )
      .eq("id", order.id)
      .single();

    if (!finalOrder || finalOrder.dispute_status !== "resolved") {
      return NextResponse.json(
        {
          error: "No se pudo verificar la actualización de la disputa",
          order: finalOrder,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: finalOrder,
    });
  } catch (error: any) {
    console.log("ERROR AL RESOLVER DISPUTA:", error);

    return NextResponse.json(
      { error: error.message || "No se pudo resolver la disputa" },
      { status: 500 }
    );
  }
}