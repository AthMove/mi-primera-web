import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "No product id" },
        { status: 400 }
      );
    }

    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error || !product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const price = Math.round(Number(product.price) * 100);

    const imageUrl =
      product.image && product.image.startsWith("http")
        ? product.image
        : "https://via.placeholder.com/400";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.title || "Producto ATHMOV",
              description: product.description || "Producto ATHMOV",
              images: [imageUrl],
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/products",
    });

    return NextResponse.redirect(session.url!);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Stripe error" },
      { status: 500 }
    );
  }
}