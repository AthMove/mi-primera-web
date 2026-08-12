import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country")?.toUpperCase() || "";

  let lang: "es" | "en" | "pt" = "en";

  if (country === "ES") {
    lang = "es";
  } else if (country === "PT") {
    lang = "pt";
  }

  return NextResponse.json({
    country,
    lang,
  });
}