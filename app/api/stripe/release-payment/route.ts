import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    await supabase
      .from("orders")
      .update({
        transfer_status: "released",
        payout_released_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    return NextResponse.json({
      success: true,
      alreadyTransferredByCheckout: true,
    });
  } catch (error: any) {
    console.log("RELEASE PAYMENT ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Release payment error" },
      { status: 500 }
    );
  }
}