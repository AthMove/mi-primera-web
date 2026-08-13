import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";
import { translations } from "@/lib/i18n";

export async function POST(req: Request) {
  try {
    const { offerId } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

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

    const locale =
      lang === "en"
        ? "en-GB"
        : lang === "pt"
          ? "pt-PT"
          : "es-ES";

    const formattedAmount = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
    }).format(Number(offer.amount || 0));

    const buyerName =
      buyer?.full_name ||
      offer.buyer_email?.split("@")[0] ||
      t.emailUserFallback;

    await sendEmail({
      to: offer.buyer_email,
      subject: t.emailOfferAcceptedSubject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h1>${t.emailOfferAcceptedTitle}</h1>

          <p>
            ${t.emailHello} ${buyerName},
          </p>

          <p>
            ${t.emailOfferAcceptedTextOne}
            <strong>${product?.title || t.emailThisProductFallback}</strong>.
          </p>

          <p>
            <strong>${t.emailOfferAcceptedAmount}</strong>
            ${formattedAmount}
          </p>

          <p>
            ${t.emailOfferAcceptedTextTwo}
          </p>

          <p>ATHMOV</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error.message ||
          "Error al enviar el email de oferta aceptada",
      },
      { status: 500 }
    );
  }
}