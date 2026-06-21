import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  console.log("ORDER SHIPPED EMAIL API CALLED");

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

    if (!order) {
      return NextResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    const { data: product } = await supabase
      .from("products")
      .select("title")
      .eq("id", order.product_id)
      .maybeSingle();

    const { data: buyer } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", order.buyer_id)
      .maybeSingle();

    if (!buyer?.email) {
      return NextResponse.json(
        { error: "Email del comprador no encontrado" },
        { status: 404 }
      );
    }

    await sendEmail({
      to: buyer.email,
      subject: "Tu pedido de ATHMOV ha sido enviado",
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h1>Pedido enviado</h1>

          <p>Hola ${buyer.full_name || "usuario"},</p>

          <p>
            Tu pedido de
            <strong>${product?.title || "tu artículo"}</strong>
            ha sido enviado.
          </p>

          <p>
            <strong>Transportista:</strong>
            ${order.carrier || "Pendiente"}
          </p>

          <p>
            <strong>Número de seguimiento:</strong>
            ${order.tracking_number || "Pendiente"}
          </p>

          <p>
            Puedes seguir tu pedido desde tu cuenta de ATHMOV.
          </p>

          <p>ATHMOV</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Error al enviar el email",
      },
      { status: 500 }
    );
  }
}