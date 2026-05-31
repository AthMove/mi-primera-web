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

    const ordersWithBuyerEmail = await Promise.all(
      (data || []).map(async (order: any) => {
        if (order.buyer_email) {
          return order;
        }

        if (!order.buyer_id) {
          return {
            ...order,
            buyer_email: null,
          };
        }

        const { data: userData, error: userError } =
          await supabaseAdmin.auth.admin.getUserById(order.buyer_id);

        return {
          ...order,
          buyer_email: userError ? null : userData?.user?.email || null,
        };
      })
    );

    return NextResponse.json({ orders: ordersWithBuyerEmail });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown server error" },
      { status: 500 }
    );
  }
}