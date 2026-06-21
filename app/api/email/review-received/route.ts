import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    const { data: review } = await supabase
      .from("reviews")
      .select("*")
      .eq("order_id", orderId)
      .maybeSingle();

    if (!order || !review) {
      return NextResponse.json(
        { error: "Pedido o valoración no encontrada" },
        { status: 404 }
      );
    }

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
      await sendEmail({
        to: seller.email,
        subject: "Has recibido una nueva valoración en ATHMOV",
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
            <h1>Nueva valoración recibida</h1>

            <p>Hola ${seller.full_name || "usuario"},</p>

            <p>
              Has recibido una
              <strong> valoración de ${review.rating} estrellas </strong>
              para
              <strong>${product?.title || "tu artículo"}</strong>.
            </p>

            <p>${review.comment || ""}</p>

            <p>
              Gracias por vender en ATHMOV.
            </p>

            <p>ATHMOV</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Error al enviar el email de valoración",
      },
      { status: 500 }
    );
  }
}