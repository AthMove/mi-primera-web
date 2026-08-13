import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";
import { translations } from "@/lib/i18n";

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
      .select("email, full_name, preferred_language")
      .eq("id", sellerId)
      .maybeSingle();

    if (!seller?.email) {
      return NextResponse.json(
        { error: "Email del vendedor no encontrado" },
        { status: 404 }
      );
    }

    const lang: "es" | "en" | "pt" =
      seller.preferred_language === "en" ||
      seller.preferred_language === "pt"
        ? seller.preferred_language
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
    }).format(Number(amount || 0));

    await sendEmail({
      to: seller.email,
      subject: t.emailOfferReceivedSubject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h1>${t.emailOfferReceivedTitle}</h1>

          <p>
            ${t.emailHello} ${seller.full_name || t.emailUserFallback},
          </p>

          <p>
            ${t.emailOfferReceivedText}
            <strong>${product?.title || t.emailYourItemFallback}</strong>.
          </p>

          <p>
            <strong>${t.emailOfferLabel}</strong>
            ${formattedAmount}
          </p>

          <p>
            <strong>${t.emailBuyerLabel}</strong>
            ${buyerEmail || t.emailAthmovBuyerFallback}
          </p>

          <p>
            ${t.emailOfferReceivedReview}
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
          error.message || "Error al enviar el email de oferta",
      },
      { status: 500 }
    );
  }
}