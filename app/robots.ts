import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        disallow: [
          "/api/",
          "/auth/",
          "/checkout/",
        ],
      },
    ],

    sitemap: "https://athmov.com/sitemap.xml",

    host: "https://athmov.com",
  };
}