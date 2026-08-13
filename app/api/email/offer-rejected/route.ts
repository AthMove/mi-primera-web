import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { translations } from "@/lib/i18n";

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
      .select("title")
      .eq("id", offer.product_id)
      .maybeSingle();

    const { data: buyer } = await supabase
      .from("profiles")
      .select("full_name, preferred_language")
      .eq("email", offer.buyer_email)
      .maybeSingle();

    const lang: "es" | "en" | "pt" =
      buyer?.preferred_language === "en" ||
      buyer?.preferred_language === "pt"
        ? buyer.preferred_language
        : "es";

    const t = translations[lang];

    const buyerName =
      buyer?.full_name ||
      offer.buyer_email?.split("@")[0] ||
      t.emailUserFallback;

    await resend.emails.send({
      from: "ATHMOV <orders@athmov.com>",
      to: offer.buyer_email,
      subject: t.emailOfferRejectedSubject,
      html: `
        <div style="font-family:Arial,sans-serif;padding:40px;max-width:600px;margin:auto">
          <h2>${t.emailOfferRejectedTitle}</h2>

          <p>${t.emailHello} ${buyerName},</p>

          <p>
            ${t.emailOfferRejectedTextOne}
            <strong>${product?.title || t.emailThisProductFallback}</strong>
            ${t.emailOfferRejectedTextTwo}
          </p>

          <p>
            ${t.emailOfferRejectedNextStep}
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