import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const cronSecret = process.env.CRON_SECRET;

  if (!supabaseUrl || !serviceRoleKey || !cronSecret) {
    return NextResponse.json(
      { error: "Missing server environment variables" },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

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

  let releaseSuccess = 0;
  let releaseFailed = 0;

  for (const order of deliveredOrders || []) {
    await supabase
      .from("orders")
      .update({
        status: "completed",
        completed_at: now.toISOString(),
        transfer_status: "ready_to_release",
      })
      .eq("id", order.id);

    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      const response = await fetch(`${siteUrl}/api/stripe/release-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cronSecret}`,
        },
        body: JSON.stringify({
          orderId: order.id,
        }),
      });

      if (response.ok) {
        releaseSuccess++;
      } else {
        releaseFailed++;
        const data = await response.json().catch(() => null);
        console.log("RELEASE FAILED:", order.id, data);
      }
    } catch (error) {
      releaseFailed++;
      console.log("RELEASE ERROR:", order.id, error);
    }
  }

  return NextResponse.json({
    success: true,
    shippedToDelivered: shippedOrders?.length || 0,
    deliveredToCompleted: deliveredOrders?.length || 0,
    releaseSuccess,
    releaseFailed,
  });
}