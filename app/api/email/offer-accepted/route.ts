import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

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
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    const { data: product } = await supabase
      .from("products")
      .select("title")
      .eq("id", offer.product_id)
      .maybeSingle();

    const { data: buyer } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", offer.buyer_id)
      .maybeSingle();

    const buyerEmail = buyer?.email || offer.buyer_email;

    if (!buyerEmail) {
      return NextResponse.json({ error: "Buyer email not found" }, { status: 404 });
    }

    await sendEmail({
      to: buyerEmail,
      subject: "Your offer has been accepted on ATHMOV",
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h1>Offer accepted</h1>
          <p>Hi ${buyer?.full_name || "there"},</p>
          <p>Your offer for <strong>${product?.title || "this item"}</strong> has been accepted.</p>
          <p><strong>Offer amount:</strong> €${Number(offer.amount).toFixed(2)}</p>
          <p>Please go to ATHMOV to complete your purchase securely.</p>
          <p>ATHMOV</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Offer accepted email failed" },
      { status: 500 }
    );
  }
}