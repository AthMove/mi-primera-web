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

    const { data: seller } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", order.seller_id)
      .maybeSingle();

    if (seller?.email) {
      await sendEmail({
        to: seller.email,
        subject: "Se ha abierto una disputa en ATHMOV",
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
            <h1>Disputa abierta</h1>

            <p>Hola ${seller.full_name || "usuario"},</p>

            <p>
              Se ha abierto una disputa relacionada con
              <strong>${product?.title || "tu artículo"}</strong>.
            </p>

            <p>
              <strong>Motivo:</strong>
              ${order.dispute_reason || "No se ha indicado ningún motivo"}
            </p>

            <p>
              El pago ha quedado temporalmente retenido mientras ATHMOV revisa el caso.
            </p>

            <p>
              Consulta tu página de Pedidos para obtener más información.
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
        error:
          error.message || "Error al enviar el correo de disputa",
      },
      { status: 500 }
    );
  }
}