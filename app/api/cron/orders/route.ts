import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const shippedLimit = new Date(now);
  shippedLimit.setDate(shippedLimit.getDate() - 3);

  const deliveredLimit = new Date(now);
  deliveredLimit.setHours(deliveredLimit.getHours() - 72);

  const { data: shippedOrders } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "shipped")
    .lt("shipped_at", shippedLimit.toISOString());

  for (const order of shippedOrders || []) {
    await supabase
      .from("orders")
      .update({
        status: "delivered",
        delivered_at: now.toISOString(),
      })
      .eq("id", order.id);
  }

  const { data: deliveredOrders } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "delivered")
    .lt("delivered_at", deliveredLimit.toISOString())
    .or("dispute_status.is.null,dispute_status.neq.open");

  for (const order of deliveredOrders || []) {
    await supabase
      .from("orders")
      .update({
        status: "completed",
        completed_at: now.toISOString(),
       transfer_status: "ready_to_release",
      })
      .eq("id", order.id);
  }

  return NextResponse.json({
    success: true,
    shippedToDelivered: shippedOrders?.length || 0,
    deliveredToCompleted: deliveredOrders?.length || 0,
  });
}