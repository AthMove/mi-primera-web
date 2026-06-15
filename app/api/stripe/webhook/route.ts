import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

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
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log("WEBHOOK SIGNATURE ERROR:", error.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      console.log("CHECKOUT COMPLETED RECEIVED");
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      let paymentIntentId = session.payment_intent?.toString();

      if (!paymentIntentId && session.id) {
        const fullSession = await stripe.checkout.sessions.retrieve(session.id);
        paymentIntentId = fullSession.payment_intent?.toString();
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
        console.log("NO ORDER FOUND FOR CHECKOUT:", metadata);
        return NextResponse.json({ received: true });
      }

console.log("UPDATING ORDER", orderId);
console.log("TIME", new Date().toISOString());

const { data: currentOrder } = await supabase
  .from("orders")
  .select("payment_status")
  .eq("id", orderId)
  .maybeSingle();

const wasAlreadyPaid = currentOrder?.payment_status === "paid";

      const { data: updatedOrder, error: updateError } = await supabase
        .from("orders")
        .update({
         status: "paid",
payment_status: "paid",
transfer_status: "pending",
          stripe_payment_intent: paymentIntentId,
          paid_at: new Date().toISOString(),
          platform_fee: Number(metadata.platform_fee || 0),
          seller_amount: Number(metadata.seller_amount || 0),
          stripe_fee_estimate: Number(metadata.stripe_fee_estimate || 0),
          seller_stripe_account_id: metadata.seller_stripe_account_id,
        })
        .eq("id", orderId)
        .select("*")
        .single();

      if (updateError || !updatedOrder) {
        console.log("ORDER UPDATE ERROR:", updateError);
        return NextResponse.json(
          { error: updateError?.message || "Order update failed" },
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
          console.log("PRODUCT SOLD UPDATE ERROR:", productError);
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
          .select("email, full_name")
          .eq("id", order.buyer_id)
          .maybeSingle();

        const { data: seller } = await supabase
          .from("profiles")
          .select("email, full_name")
          .eq("id", order.seller_id)
          .maybeSingle();

        const productTitle = product?.title || "your item";
        const amount = Number(order.amount || metadata.amount || 0).toFixed(2);

        if (buyer?.email) {
          await sendEmail({
            to: buyer.email,
            subject: "Your ATHMOV order is confirmed",
            html: `
              <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
                <h1>Order confirmed</h1>
                <p>Hi ${buyer.full_name || "there"},</p>
                <p>Your order for <strong>${productTitle}</strong> has been confirmed.</p>
                <p>The seller will prepare the shipment and add tracking soon.</p>
                <p><strong>Total:</strong> €${amount}</p>
                <p>You can track your order from your ATHMOV account.</p>
                <p>ATHMOV</p>
              </div>
            `,
          });
        }

        if (seller?.email) {
          await sendEmail({
            to: seller.email,
            subject: "You sold an item on ATHMOV",
            html: `
              <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
                <h1>New sale</h1>
                <p>Hi ${seller.full_name || "there"},</p>
                <p>Your item <strong>${productTitle}</strong> has been sold.</p>
                <p>Please prepare the shipment and add tracking from your Orders page.</p>
                <p>Your payout will be released after the order is completed.</p>
                <p>ATHMOV</p>
              </div>
            `,
          });
        }
      }
    }

    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      await supabase
        .from("orders")
        .update({
          payment_status: "failed",
        })
        .eq("stripe_payment_intent", paymentIntent.id);
    }

    if (event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId = charge.payment_intent?.toString();

      await supabase
        .from("orders")
        .update({
          payment_status: "refunded",
          refunded_at: new Date().toISOString(),
          refund_amount: (charge.amount_refunded || 0) / 100,
        })
        .eq("stripe_payment_intent", paymentIntentId);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.log("WEBHOOK HANDLER ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}