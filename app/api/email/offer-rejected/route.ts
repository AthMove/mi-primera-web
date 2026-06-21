import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { offerId } = await req.json();

    const { data: offer } = await supabase
      .from("offers")
      .select("*")
      .eq("id", offerId)
      .single();

    if (!offer) {
      return NextResponse.json(
        { error: "Oferta no encontrada" },
        { status: 404 }
      );
    }

    const { data: product } = await supabase
      .from("products")
      .select("*")
      .eq("id", offer.product_id)
      .single();

    await resend.emails.send({
      from: "ATHMOV <orders@athmov.com>",
      to: offer.buyer_email,
      subject: "Tu oferta no ha sido aceptada",
      html: `
        <div style="font-family:Arial,sans-serif;padding:40px;max-width:600px;margin:auto">
          <h2>Tu oferta no ha sido aceptada</h2>

          <p>Hola ${offer.buyer_email.split("@")[0]},</p>

          <p>
            Lamentablemente, tu oferta por
            <strong>${product?.title || "este producto"}</strong>
            no ha sido aceptada por el vendedor.
          </p>

          <p>
            Aún puedes contactar con el vendedor o realizar una nueva oferta.
          </p>

          <p>ATHMOV</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error al enviar el correo" },
      { status: 500 }
    );
  }
}