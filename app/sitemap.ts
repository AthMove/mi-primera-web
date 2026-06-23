import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://athmov.com";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/blog/golf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/padel`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/tenis`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/blog/cuando-comprar-vender-palos-golf-segunda-mano`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/como-calcular-precio-palos-golf-segunda-mano`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/como-verificar-palos-golf-originales`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/blog/como-valorar-pala-padel-segunda-mano`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/como-detectar-pala-padel-falsa`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/blog/como-verificar-raqueta-tenis-original`,
      lastModified: new Date(),
    },
  ];
}