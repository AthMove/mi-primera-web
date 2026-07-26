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

    if (!stripeSecretKey || !supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: "Faltan variables de entorno del servidor",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const userId = body?.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "Falta userId" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("stripe_account_id")
        .eq("id", userId)
        .maybeSingle();

    if (profileError) {
      return NextResponse.json(
        {
          error: `Error leyendo el perfil: ${profileError.message}`,
        },
        { status: 500 }
      );
    }

    if (!profile?.stripe_account_id) {
      return NextResponse.json({
        connected: false,
        onboardingComplete: false,
        chargesEnabled: false,
        payoutsEnabled: false,
        transfersActive: false,
        disabledReason: null,
        requirementsCurrentlyDue: [],
        requirementsPastDue: [],
        requirementsEventuallyDue: [],
      });
    }

    const account = await stripe.accounts.retrieve(
      profile.stripe_account_id
    );

    const onboardingComplete =
      account.details_submitted === true;

    const chargesEnabled =
      account.charges_enabled === true;

    const payoutsEnabled =
      account.payouts_enabled === true;

    const transfersActive =
      account.capabilities?.transfers === "active";

    const disabledReason =
      account.requirements?.disabled_reason ?? null;

    const requirementsCurrentlyDue =
      account.requirements?.currently_due ?? [];

    const requirementsPastDue =
      account.requirements?.past_due ?? [];

    const requirementsEventuallyDue =
      account.requirements?.eventually_due ?? [];

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        stripe_onboarding_complete:
          onboardingComplete,
        stripe_charges_enabled:
          chargesEnabled,
        stripe_payouts_enabled:
          payoutsEnabled,
      })
      .eq("id", userId);

    if (updateError) {
      return NextResponse.json(
        {
          error: `Stripe se consultó correctamente, pero Supabase no pudo actualizarse: ${updateError.message}`,
          connected: true,
          onboardingComplete,
          chargesEnabled,
          payoutsEnabled,
          transfersActive,
          disabledReason,
          requirementsCurrentlyDue,
          requirementsPastDue,
          requirementsEventuallyDue,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      connected: true,
      accountId: account.id,
      detailsSubmitted:
        account.details_submitted,
      onboardingComplete,
      chargesEnabled,
      payoutsEnabled,
      transfersActive,
      transfersCapability:
        account.capabilities?.transfers ?? null,
      disabledReason,
      requirementsCurrentlyDue,
      requirementsPastDue,
      requirementsEventuallyDue,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Error consultando el estado de Stripe";

    console.error(
      "STRIPE CONNECT STATUS ERROR:",
      message
    );

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}