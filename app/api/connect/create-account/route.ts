import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!stripeSecretKey || !supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Faltan variables de entorno del servidor" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ error: "Falta userId" }, { status: 400 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, stripe_account_id")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 }
      );
    }

    let accountId = profile.stripe_account_id || null;

    if (accountId) {
      try {
        await stripe.accounts.retrieve(accountId);
      } catch (error: any) {
        console.log("STRIPE ACCOUNT INVALID:", accountId, error.message);

        accountId = null;

        await supabase
          .from("profiles")
          .update({
            stripe_account_id: null,
            stripe_onboarding_complete: false,
            stripe_charges_enabled: false,
            stripe_payouts_enabled: false,
          })
          .eq("id", userId);
      }
    }

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "ES",
        business_type: "individual",
        email: body.email || profile.email || undefined,
        metadata: {
          user_id: userId,
          platform: "ATHMOV",
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
          stripe_onboarding_complete: false,
          stripe_charges_enabled: false,
          stripe_payouts_enabled: false,
        })
        .eq("id", userId);

      if (updateError) {
        console.log("PROFILE UPDATE ERROR:", updateError.message);

        return NextResponse.json(
          { error: updateError.message },
          { status: 500 }
        );
      }
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${origin}/account`,
      return_url: `${origin}/account`,
      type: "account_onboarding",
    });

    return NextResponse.json({
      success: true,
      url: accountLink.url,
      accountId,
    });
  } catch (error: any) {
    console.log("STRIPE CONNECT ERROR:", error?.message || error);

    return NextResponse.json(
      {
        error: error?.message || "Error de Stripe Connect",
      },
      { status: 500 }
    );
  }
}