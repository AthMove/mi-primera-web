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
      return NextResponse.json({ error: "Seller email not found" }, { status: 404 });
    }

    await sendEmail({
      to: seller.email,
      subject: "You received a new offer on ATHMOV",
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h1>New offer received</h1>
          <p>Hi ${seller.full_name || "there"},</p>
          <p>You received a new offer for <strong>${product?.title || "your item"}</strong>.</p>
          <p><strong>Offer:</strong> €${Number(amount).toFixed(2)}</p>
          <p><strong>Buyer:</strong> ${buyerEmail || "ATHMOV buyer"}</p>
          <p>You can review the offer from your ATHMOV account.</p>
          <p>ATHMOV</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Offer email failed" },
      { status: 500 }
    );
  }
}