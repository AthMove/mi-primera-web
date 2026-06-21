import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Faltan variables de entorno de Supabase" },
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
        products (
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
        let sellerEmail = order.products?.seller_email || null;

        if (!buyerEmail && order.buyer_id) {
          const { data: buyerUser } =
            await supabaseAdmin.auth.admin.getUserById(order.buyer_id);

          buyerEmail = buyerUser?.user?.email || null;
        }

        if (!sellerEmail && order.seller_id) {
          const { data: sellerProfile } = await supabaseAdmin
            .from("profiles")
            .select("email")
            .eq("id", order.seller_id)
            .maybeSingle();

          sellerEmail = sellerProfile?.email || null;
        }

        const { data: evidence, error: evidenceError } = await supabaseAdmin
          .from("dispute_evidence")
          .select("*")
          .eq("order_id", order.id)
          .order("created_at", { ascending: true });

        if (evidenceError) {
          console.log("DISPUTE EVIDENCE ERROR:", evidenceError.message);
        }

        return {
          ...order,
          buyer_email: buyerEmail,
          seller_email: sellerEmail,
          evidence: evidence || [],
        };
      })
    );

    return NextResponse.json({
      success: true,
      orders: ordersWithDetails,
    });
  } catch (error: any) {
    console.log("ADMIN DISPUTES API ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Error del servidor" },
      { status: 500 }
    );
  }
}