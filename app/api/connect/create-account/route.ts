import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();

    const userId = body.userId;
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, stripe_account_id")
      .eq("id", userId)
      .single();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    let accountId = profile?.stripe_account_id;

    if (accountId) {
      try {
        await stripe.accounts.retrieve(accountId);
      } catch (error: any) {
        console.log("OLD STRIPE ACCOUNT INVALID:", accountId, error.message);
        accountId = null;
      }
    }

    if (!accountId) {
   const account = await stripe.accounts.create({
  type: "express",
  country: "ES",
  business_type: "individual",
  email: body.email || profile?.email,
  metadata: {
    user_id: userId,
  },
  capabilities: {
    transfers: {
      requested: true,
    },
  },
});

      accountId = account.id;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          stripe_account_id: accountId,
          stripe_charges_enabled: false,
          stripe_payouts_enabled: false,
        })
        .eq("id", userId);

      if (updateError) {
        console.log("PROFILE UPDATE ERROR:", updateError);
        return NextResponse.json(
          { error: updateError.message },
          { status: 500 }
        );
      }

      console.log("NEW CONNECTED ACCOUNT SAVED:", accountId);
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${origin}/account`,
      return_url: `${origin}/account`,
      type: "account_onboarding",
    });

    return NextResponse.json({
      url: accountLink.url,
      accountId,
    });
  } catch (error: any) {
    console.log("STRIPE CONNECT ERROR:", error?.message || error);

    return NextResponse.json(
      {
        error: error?.message || "Stripe Connect error",
      },
      {
        status: 500,
      }
    );
  }
}