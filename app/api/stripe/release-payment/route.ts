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

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Falta orderId" }, { status: 400 });
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

    if (order.dispute_status === "open") {
      return NextResponse.json(
        { error: "No se puede liberar el pago con una disputa abierta" },
        { status: 400 }
      );
    }

    if (order.payment_status !== "paid") {
      return NextResponse.json(
        { error: "El pedido no está pagado" },
        { status: 400 }
      );
    }

    if (order.payment_status === "refunded" || order.stripe_refund_id) {
      return NextResponse.json(
        { error: "El pedido ya fue reembolsado" },
        { status: 400 }
      );
    }

    if (order.transfer_status === "released" || order.stripe_transfer_id) {
      return NextResponse.json({
        success: true,
        alreadyReleased: true,
        transferId: order.stripe_transfer_id,
      });
    }

    if (!order.seller_stripe_account_id) {
      return NextResponse.json(
        { error: "El vendedor no tiene cuenta Stripe conectada" },
        { status: 400 }
      );
    }

    const sellerAmount = Math.round(Number(order.seller_amount || 0) * 100);

    if (!sellerAmount || sellerAmount <= 0) {
      return NextResponse.json(
        { error: "Importe del vendedor inválido" },
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
        seller_id: order.seller_id || "",
        buyer_id: order.buyer_id || "",
        platform: "ATHMOV",
      },
    });

    const now = new Date().toISOString();

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "completed",
        transfer_status: "released",
        stripe_transfer_id: transfer.id,
        payout_released_at: now,
        completed_at: order.completed_at || now,
      })
      .eq("id", order.id);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    await supabase.from("notifications").insert([
      {
        user_id: order.seller_id,
        type: "sale",
        title: "Pago liberado",
        message: "Tu pago ha sido liberado correctamente.",
        link: "/orders",
        is_read: false,
      },
      {
        user_id: order.buyer_id,
        type: "order",
        title: "Pedido completado",
        message: "El pedido se ha completado correctamente.",
        link: "/orders",
        is_read: false,
      },
    ]);

    return NextResponse.json({
      success: true,
      transferId: transfer.id,
    });
  } catch (error: any) {
    console.log("RELEASE PAYMENT ERROR:", error?.message || error);

    return NextResponse.json(
      { error: error?.message || "No se pudo liberar el pago" },
      { status: 500 }
    );
  }
}