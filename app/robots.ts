import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/image"],

        disallow: [
          "/api/",
          "/auth/",
          "/checkout/",
          "/messages/",
          "/orders/",
          "/profile/",
          "/settings/",
        ],
      },
    ],

    sitemap: "https://athmov.com/sitemap.xml",

    host: "https://athmov.com",
  };
}