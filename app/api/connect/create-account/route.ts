import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userId = body.userId;
    const origin = body.origin || "http://localhost:3000";

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_account_id")
      .eq("id", userId)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    let accountId = profile?.stripe_account_id;

 if (!accountId) {
  const account = await stripe.accounts.create({
    type: "express",
    country: "ES",

    email: body.email,

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
    })
    .eq("id", userId);

  if (updateError) {
    console.log(
      "PROFILE UPDATE ERROR:",
      updateError
    );
  }

  console.log(
    "CONNECTED ACCOUNT SAVED:",
    accountId
  );
}

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${origin}/account`,
      return_url: `${origin}/account`,
      type: "account_onboarding",
    });

    return NextResponse.json({
      url: accountLink.url,
    });

  } catch (error: any) {
    console.log(
      "STRIPE CONNECT ERROR:",
      error?.message || error
    );

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