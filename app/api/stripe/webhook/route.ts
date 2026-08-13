import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { translations } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Falta la firma de Stripe" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log("ERROR DE FIRMA DEL WEBHOOK:", error.message);

    return NextResponse.json(
      { error: "Firma no válida" },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      console.log("CHECKOUT COMPLETADO RECIBIDO");

      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      let paymentIntentId = session.payment_intent?.toString();

      if (!paymentIntentId && session.id) {
        const fullSession =
          await stripe.checkout.sessions.retrieve(session.id);

        paymentIntentId =
          fullSession.payment_intent?.toString();
      }

      let orderId = metadata.order_id;

      if (!orderId) {
        const { data: existingOrder } = await supabase
          .from("orders")
          .select("*")
          .eq("product_id", metadata.product_id)
          .eq("buyer_id", metadata.buyer_id)
          .eq("seller_id", metadata.seller_id)
          .eq("payment_status", "pending")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        orderId = existingOrder?.id;
      }

      if (!orderId) {
        console.log(
          "NO SE ENCONTRÓ PEDIDO PARA CHECKOUT:",
          metadata
        );

        return NextResponse.json({ received: true });
      }

      console.log("ACTUALIZANDO PEDIDO", orderId);
      console.log("FECHA", new Date().toISOString());

      const { data: currentOrder } = await supabase
        .from("orders")
        .select("payment_status")
        .eq("id", orderId)
        .maybeSingle();

      const wasAlreadyPaid =
        currentOrder?.payment_status === "paid";

      const {
        data: updatedOrder,
        error: updateError,
      } = await supabase
        .from("orders")
        .update({
          status: "paid",
          payment_status: "paid",
          transfer_status: "pending",
          stripe_payment_intent: paymentIntentId,
          paid_at: new Date().toISOString(),
          platform_fee: Number(
            metadata.platform_fee || 0
          ),
          seller_amount: Number(
            metadata.seller_amount || 0
          ),
          stripe_fee_estimate: Number(
            metadata.stripe_fee_estimate || 0
          ),
          seller_stripe_account_id:
            metadata.seller_stripe_account_id,
        })
        .eq("id", orderId)
        .select("*")
        .single();

      if (updateError || !updatedOrder) {
        console.log(
          "ERROR AL ACTUALIZAR PEDIDO:",
          updateError
        );

        return NextResponse.json(
          {
            error:
              updateError?.message ||
              "No se pudo actualizar el pedido",
          },
          { status: 500 }
        );
      }

      if (updatedOrder.product_id) {
        const { error: productError } = await supabase
          .from("products")
          .update({ sold: true })
          .eq("id", updatedOrder.product_id);

        await supabase
          .from("offers")
          .update({ status: "rejected" })
          .eq("product_id", updatedOrder.product_id)
          .eq("status", "pending");

        if (productError) {
          console.log(
            "ERROR AL MARCAR PRODUCTO COMO VENDIDO:",
            productError
          );
        }
      }

      const { data: order } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (order && !wasAlreadyPaid) {
        const { sendEmail } = await import("@/lib/email");

        const { data: product } = await supabase
          .from("products")
          .select("title")
          .eq("id", order.product_id)
          .maybeSingle();

        const { data: buyer } = await supabase
          .from("profiles")
          .select(
            "email, full_name, preferred_language"
          )
          .eq("id", order.buyer_id)
          .maybeSingle();

        const { data: seller } = await supabase
          .from("profiles")
          .select(
            "email, full_name, preferred_language"
          )
          .eq("id", order.seller_id)
          .maybeSingle();

        if (buyer?.email) {
          const buyerLang: "es" | "en" | "pt" =
            buyer.preferred_language === "en" ||
            buyer.preferred_language === "pt"
              ? buyer.preferred_language
              : "es";

          const buyerT = translations[buyerLang];

          const buyerLocale =
            buyerLang === "en"
              ? "en-GB"
              : buyerLang === "pt"
                ? "pt-PT"
                : "es-ES";

          const buyerProductTitle =
            product?.title ||
            buyerT.emailYourItemFallback;

          const formattedAmount =
            new Intl.NumberFormat(buyerLocale, {
              style: "currency",
              currency: "EUR",
            }).format(
              Number(
                order.amount ||
                  metadata.amount ||
                  0
              )
            );

          await sendEmail({
            to: buyer.email,
            subject:
              buyerT.emailOrderConfirmedSubject,
            html: `
              <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
                <h1>${buyerT.emailOrderConfirmedTitle}</h1>

                <p>
                  ${buyerT.emailHello} ${
                    buyer.full_name ||
                    buyerT.emailUserFallback
                  },
                </p>

                <p>
                  ${buyerT.emailOrderConfirmedTextOne}
                  <strong>${buyerProductTitle}</strong>
                  ${buyerT.emailOrderConfirmedTextTwo}
                </p>

                <p>
                  ${buyerT.emailOrderConfirmedShipping}
                </p>

                <p>
                  <strong>${buyerT.emailTotalLabel}</strong>
                  ${formattedAmount}
                </p>

                <p>
                  ${buyerT.emailOrderConfirmedTrack}
                </p>

                <p>ATHMOV</p>
              </div>
            `,
          });
        }

        if (seller?.email) {
          const sellerLang: "es" | "en" | "pt" =
            seller.preferred_language === "en" ||
            seller.preferred_language === "pt"
              ? seller.preferred_language
              : "es";

          const sellerT = translations[sellerLang];

          const sellerProductTitle =
            product?.title ||
            sellerT.emailYourItemFallback;

          await sendEmail({
            to: seller.email,
            subject: sellerT.emailNewSaleSubject,
            html: `
              <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
                <h1>${sellerT.emailNewSaleTitle}</h1>

                <p>
                  ${sellerT.emailHello} ${
                    seller.full_name ||
                    sellerT.emailUserFallback
                  },
                </p>

                <p>
                  ${sellerT.emailNewSaleTextOne}
                  <strong>${sellerProductTitle}</strong>
                  ${sellerT.emailNewSaleTextTwo}
                </p>

                <p>
                  ${sellerT.emailNewSalePrepare}
                </p>

                <p>
                  ${sellerT.emailNewSalePayment}
                </p>

                <p>ATHMOV</p>
              </div>
            `,
          });
        }
      }
    }

    if (
      event.type === "payment_intent.payment_failed"
    ) {
      const paymentIntent =
        event.data.object as Stripe.PaymentIntent;

      await supabase
        .from("orders")
        .update({
          payment_status: "failed",
        })
        .eq(
          "stripe_payment_intent",
          paymentIntent.id
        );
    }

    if (event.type === "charge.refunded") {
      const charge =
        event.data.object as Stripe.Charge;

      const paymentIntentId =
        charge.payment_intent?.toString();

      await supabase
        .from("orders")
        .update({
          payment_status: "refunded",
          refunded_at: new Date().toISOString(),
          refund_amount:
            (charge.amount_refunded || 0) / 100,
        })
        .eq(
          "stripe_payment_intent",
          paymentIntentId
        );
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.log(
      "ERROR EN EL WEBHOOK:",
      error.message
    );

    return NextResponse.json(
      {
        error:
          error.message || "Error en el webhook",
      },
      { status: 500 }
    );
  }
}