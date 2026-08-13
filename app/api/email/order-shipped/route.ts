import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";
import { translations } from "@/lib/i18n";

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
      .select("email, full_name, preferred_language")
      .eq("id", order.buyer_id)
      .maybeSingle();

    if (!buyer?.email) {
      return NextResponse.json(
        { error: "Email del comprador no encontrado" },
        { status: 404 }
      );
    }

    const lang: "es" | "en" | "pt" =
      buyer.preferred_language === "en" ||
      buyer.preferred_language === "pt"
        ? buyer.preferred_language
        : "es";

    const t = translations[lang];

    await sendEmail({
      to: buyer.email,
      subject: t.emailOrderShippedSubject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h1>${t.emailOrderShippedTitle}</h1>

          <p>
            ${t.emailHello} ${buyer.full_name || t.emailUserFallback},
          </p>

          <p>
            ${t.emailOrderShippedTextOne}
            <strong>${product?.title || t.emailYourItemFallback}</strong>
            ${t.emailOrderShippedTextTwo}
          </p>

          <p>
            <strong>${t.emailCarrierLabel}</strong>
            ${order.carrier || t.emailPending}
          </p>

          <p>
            <strong>${t.trackingNumber}:</strong>
            ${order.tracking_number || t.emailPending}
          </p>

          <p>
            ${t.emailOrderShippedTrack}
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
          error.message || "Error al enviar el email",
      },
      { status: 500 }
    );
  }
}