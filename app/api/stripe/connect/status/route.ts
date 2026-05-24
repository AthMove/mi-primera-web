import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("stripe_account_id")
      .eq("id", userId)
      .single();

    if (error || !profile?.stripe_account_id) {
      return NextResponse.json({
        connected: false,
        charges_enabled: false,
        payouts_enabled: false,
      });
    }

    const account = await stripe.accounts.retrieve(
      profile.stripe_account_id
    );

    const ready =
      account.details_submitted &&
      account.charges_enabled &&
      account.payouts_enabled;

    await supabase
      .from("profiles")
      .update({
        stripe_onboarding_complete: ready,
        stripe_charges_enabled: account.charges_enabled,
        stripe_payouts_enabled: account.payouts_enabled,
      })
      .eq("id", userId);

    return NextResponse.json({
      connected: true,
      ready,
      details_submitted: account.details_submitted,
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Stripe status error" },
      { status: 500 }
    );
  }
}