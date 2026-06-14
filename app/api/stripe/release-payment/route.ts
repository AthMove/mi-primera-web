import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const cronSecret = process.env.CRON_SECRET;
    const authHeader = req.headers.get("authorization");

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "completed") {
      return NextResponse.json(
        { error: "Order is not completed yet" },
        { status: 400 }
      );
    }

    if (order.dispute_status === "open") {
      return NextResponse.json(
        { error: "Order has an open dispute" },
        { status: 400 }
      );
    }

    const alreadyReleased = order.transfer_status === "released";

    await supabase
      .from("orders")
      .update({
        transfer_status: "released",
        payout_released_at: order.payout_released_at || new Date().toISOString(),
      })
      .eq("id", order.id);

    if (!alreadyReleased) {
      const { data: product } = await supabase
        .from("products")
        .select("title")
        .eq("id", order.product_id)
        .maybeSingle();

      const { data: seller } = await supabase
        .from("profiles")
        .select("email, full_name")
        .eq("id", order.seller_id)
        .maybeSingle();

      if (seller?.email) {
        const sellerAmount = Number(
          order.seller_amount || order.amount || 0
        ).toFixed(2);

        await sendEmail({
          to: seller.email,
          subject: "Your ATHMOV payout has been released",
          html: `
            <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
              <h1>Payout released</h1>
              <p>Hi ${seller.full_name || "there"},</p>
              <p>Your payout for <strong>${product?.title || "your item"}</strong> has been released.</p>
              <p><strong>Amount:</strong> €${sellerAmount}</p>
              <p>The funds should appear according to your Stripe payout schedule.</p>
              <p>ATHMOV</p>
            </div>
          `,
        });
      }
    }

    return NextResponse.json({
      success: true,
      alreadyTransferredByCheckout: true,
      emailSent: !alreadyReleased,
    });
  } catch (error: any) {
    console.log("RELEASE PAYMENT ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Release payment error" },
      { status: 500 }
    );
  }
}