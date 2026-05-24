import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const limitDate = new Date();
    limitDate.setHours(limitDate.getHours() - 72);

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "delivered")
      .neq("dispute_status", "open")
      .lte("delivered_at", limitDate.toISOString());

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const completed: string[] = [];
    const failed: any[] = [];

    for (const order of orders || []) {
      try {
        const releaseResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/release-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: order.id,
            }),
          }
        );

        const releaseData = await releaseResponse.json();

        if (!releaseResponse.ok) {
          failed.push({
            orderId: order.id,
            error: releaseData.error || "Release failed",
          });
          continue;
        }

        await supabase
          .from("orders")
          .update({
            status: "completed",
            completed_at: new Date().toISOString(),
          })
          .eq("id", order.id);

        await supabase.from("notifications").insert([
          {
            user_id: order.buyer_id,
            type: "order",
            title: "Order completed",
            message: "Your order was automatically completed after 72 hours.",
            link: "/orders",
          },
          {
            user_id: order.seller_id,
            type: "sale",
            title: "Payout released",
            message: "Your payout has been automatically released.",
            link: "/orders",
          },
        ]);

        completed.push(order.id);
      } catch (error: any) {
        failed.push({
          orderId: order.id,
          error: error.message || "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      checked: orders?.length || 0,
      completed,
      failed,
    });
  } catch (error: any) {
    console.log("AUTO COMPLETE ERROR:", error?.message || error);

    return NextResponse.json(
      { error: error.message || "Auto complete failed" },
      { status: 500 }
    );
  }
}