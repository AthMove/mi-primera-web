import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const cronSecret = process.env.CRON_SECRET;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Missing server environment variables" },
        { status: 500 }
      );
    }

    const authHeader = req.headers.get("authorization");

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const limitDate = new Date();
    limitDate.setHours(limitDate.getHours() - 72);

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "delivered")
      .or("dispute_status.is.null,dispute_status.neq.open")
      .neq("transfer_status", "released")
      .not("delivered_at", "is", null)
      .lte("delivered_at", limitDate.toISOString());

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const completed: string[] = [];
    const failed: any[] = [];

    for (const order of orders || []) {
      try {
        const releaseResponse = await fetch(
          `${siteUrl}/api/stripe/release-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(cronSecret ? { Authorization: `Bearer ${cronSecret}` } : {}),
            },
            body: JSON.stringify({
              orderId: order.id,
            }),
          }
        );

        const releaseData = await releaseResponse.json().catch(() => null);

        if (!releaseResponse.ok) {
          failed.push({
            orderId: order.id,
            error: releaseData?.error || "Release failed",
          });
          continue;
        }

        const { error: updateError } = await supabase
          .from("orders")
          .update({
            status: "completed",
            completed_at: new Date().toISOString(),
          })
          .eq("id", order.id);

        if (updateError) {
          failed.push({
            orderId: order.id,
            error: updateError.message,
          });
          continue;
        }

        await supabase.from("notifications").insert([
          {
            user_id: order.buyer_id,
            type: "order",
            title: "Pedido completado",
            message:
              "Tu pedido se ha completado automáticamente tras 72 horas desde la entrega.",
            link: "/orders",
            is_read: false,
          },
          {
            user_id: order.seller_id,
            type: "sale",
            title: "Pago liberado",
            message: "Tu pago se ha liberado automáticamente.",
            link: "/orders",
            is_read: false,
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