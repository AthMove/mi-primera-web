import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Missing Supabase env vars" },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabaseAdmin
      .from("orders")
      .select(`
        id,
        created_at,
        status,
        amount,
        dispute_status,
        dispute_reason,
        dispute_opened_at,
        dispute_resolution,
        buyer_id,
        buyer_email,
        seller_id,
        product_id,
        carrier,
        tracking_number,
        products!orders_product_id_fkey (
          id,
          title,
          image,
          images,
          price,
          sport,
          seller_email
        )
      `)
      .eq("dispute_status", "open")
      .order("dispute_opened_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    const ordersWithDetails = await Promise.all(
      (data || []).map(async (order: any) => {
        let buyerEmail = order.buyer_email || null;

        if (!buyerEmail && order.buyer_id) {
          const { data: userData } =
            await supabaseAdmin.auth.admin.getUserById(order.buyer_id);

          buyerEmail = userData?.user?.email || null;
        }

        const { data: evidence } = await supabaseAdmin
          .from("dispute_evidence")
          .select("*")
          .eq("order_id", order.id)
          .order("created_at", { ascending: true });

        return {
          ...order,
          buyer_email: buyerEmail,
          evidence: evidence || [],
        };
      })
    );

    return NextResponse.json({ orders: ordersWithDetails });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown server error" },
      { status: 500 }
    );
  }
}