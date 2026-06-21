import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { success: false, error: "Falta STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const body = await req.json();

    if (!body.sessionId) {
      return NextResponse.json(
        { success: false, error: "Falta sessionId" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(body.sessionId);

    return NextResponse.json({
      success: session.payment_status === "paid",
      payment_status: session.payment_status,
      order_id: session.metadata?.order_id || null,
    });
  } catch (error) {
    console.log("ERROR AL VERIFICAR LA SESIÓN:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}