import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";
import { translations } from "@/lib/i18n";

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
      .select("email, full_name, preferred_language")
      .eq("id", order.seller_id)
      .maybeSingle();

    if (seller?.email) {
      const lang: "es" | "en" | "pt" =
        seller.preferred_language === "en" ||
        seller.preferred_language === "pt"
          ? seller.preferred_language
          : "es";

      const t = translations[lang];

      await sendEmail({
        to: seller.email,
        subject: t.emailDisputeOpenedSubject,
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
            <h1>${t.emailDisputeOpenedTitle}</h1>

            <p>
              ${t.emailHello} ${seller.full_name || t.emailUserFallback},
            </p>

            <p>
              ${t.emailDisputeOpenedTextOne}
              <strong>${product?.title || t.emailYourItemFallback}</strong>.
            </p>

            <p>
              <strong>${t.emailDisputeReason}</strong>
              ${order.dispute_reason || t.emailDisputeNoReason}
            </p>

            <p>
              ${t.emailDisputePaymentHeld}
            </p>

            <p>
              ${t.emailDisputeCheckOrders}
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
          error.message ||
          "No se pudo enviar el email de disputa",
      },
      { status: 500 }
    );
  }
}