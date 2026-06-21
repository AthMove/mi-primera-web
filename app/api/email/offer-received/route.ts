import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { productId, sellerId, buyerEmail, amount } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: product } = await supabase
      .from("products")
      .select("title")
      .eq("id", productId)
      .maybeSingle();

    const { data: seller } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", sellerId)
      .maybeSingle();

    if (!seller?.email) {
      return NextResponse.json(
        { error: "Email del vendedor no encontrado" },
        { status: 404 }
      );
    }

    await sendEmail({
      to: seller.email,
      subject: "Has recibido una nueva oferta en ATHMOV",
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h1>Nueva oferta recibida</h1>

          <p>Hola ${seller.full_name || "usuario"},</p>

          <p>
            Has recibido una nueva oferta por
            <strong>${product?.title || "tu artículo"}</strong>.
          </p>

          <p>
            <strong>Oferta:</strong> €${Number(amount).toFixed(2)}
          </p>

          <p>
            <strong>Comprador:</strong> ${buyerEmail || "Comprador de ATHMOV"}
          </p>

          <p>
            Puedes revisar la oferta desde tu cuenta de ATHMOV.
          </p>

          <p>ATHMOV</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al enviar el email de oferta" },
      { status: 500 }
    );
  }
}