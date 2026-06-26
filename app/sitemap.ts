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

    // Categorías
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
      url: `${baseUrl}/blog/running`,
      lastModified: new Date(),
    },

    // Golf
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
  url: `${baseUrl}/blog/que-revisar-hierros-golf-segunda-mano`,
  lastModified: new Date(),
},
{
  url: `${baseUrl}/blog/que-revisar-putter-golf-segunda-mano`,
  lastModified: new Date(),
},
{
  url: `${baseUrl}/blog/como-saber-si-un-driver-golf-es-original`,
  lastModified: new Date(),
},
{
  url: `${baseUrl}/blog/que-revisar-hierros-golf-segunda-mano`,
  lastModified: new Date(),
},

    // Pádel
    {
      url: `${baseUrl}/blog/como-valorar-pala-padel-segunda-mano`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/como-detectar-pala-padel-falsa`,
      lastModified: new Date(),
    },

    // Tenis
    {
      url: `${baseUrl}/blog/como-verificar-raqueta-tenis-original`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/que-revisar-raqueta-tenis-segunda-mano`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/como-valorar-raqueta-tenis-segunda-mano`,
      lastModified: new Date(),
    },

    // Running
    {
      url: `${baseUrl}/blog/que-revisar-zapatillas-running-segunda-mano`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/como-saber-si-zapatillas-running-estan-agotadas`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/cuantos-kilometros-puede-tener-zapatilla-running-usada`,
      lastModified: new Date(),
    },
    {
  url: `${baseUrl}/blog/que-revisar-driver-golf-segunda-mano`,
  lastModified: new Date(),
},
  ];
}