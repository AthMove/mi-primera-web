import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export const revalidate = 300;

type ProductSitemapRow = {
  id: string;
  slug: string | null;
  brand: string | null;
  model: string | null;
  category: string | null;
  created_at: string | null;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function categoryToUrl(category: string) {
  const normalized = slugify(category);

  const categoryMap: Record<string, string> = {
    padel: "padel",
    golf: "golf",
    tennis: "tenis",
    tenis: "tenis",
    running: "running",
    fitness: "fitness",
  };

  return categoryMap[normalized] || normalized;
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://athmov.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sell`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/buyer-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/golf`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/padel`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tenis`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/running`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/golf`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/padel`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/tenis`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/running`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = [
    "cuando-comprar-vender-palos-golf-segunda-mano",
    "como-calcular-precio-palos-golf-segunda-mano",
    "como-verificar-palos-golf-originales",
    "que-revisar-putter-golf-segunda-mano",
    "como-saber-si-un-driver-golf-es-original",
    "que-revisar-hierros-golf-segunda-mano",
    "que-revisar-driver-golf-segunda-mano",
    "como-valorar-pala-padel-segunda-mano",
    "como-detectar-pala-padel-falsa",
    "como-verificar-raqueta-tenis-original",
    "que-revisar-raqueta-tenis-segunda-mano",
    "como-valorar-raqueta-tenis-segunda-mano",
    "que-revisar-zapatillas-running-segunda-mano",
    "como-saber-si-zapatillas-running-estan-agotadas",
    "cuantos-kilometros-puede-tener-zapatilla-running-usada",
    "bullpadel-vertex-04-segunda-mano",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

 const { data, error } = await supabase
  .from("products")
  .select("id,slug,brand,model,category,created_at")
  .eq("moderation_status", "approved");

  if (error) {
    console.error("Error generando sitemap:", error);

    return [...staticPages, ...blogPages];
  }

  const products = (data || []) as ProductSitemapRow[];

const productPages: MetadataRoute.Sitemap = products.map(
  (product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.created_at
      ? new Date(product.created_at)
      : now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  })
);

  const brandMap = new Map<string, string>();
  const modelMap = new Map<
  string,
  {
    brand: string;
    model: string;
  }
>();
  const categoryBrandMap = new Map<
    string,
    {
      categorySlug: string;
      brandSlug: string;
    }
  >();

  for (const product of products) {
    const brand = product.brand?.trim();
    const category = product.category?.trim();

    const model = product.model?.trim();

    if (brand) {
      const brandSlug = slugify(brand);

      if (brandSlug) {
        brandMap.set(brandSlug, brand);
      }
    }

    if (brand && model) {
  const modelSlug = slugify(`${brand} ${model}`);

  if (modelSlug) {
    modelMap.set(modelSlug, {
      brand,
      model,
    });
  }
}

    if (brand && category) {
      const brandSlug = slugify(brand);
      const categorySlug = categoryToUrl(category);

      if (brandSlug && categorySlug) {
        const key = `${categorySlug}/${brandSlug}`;

        categoryBrandMap.set(key, {
          categorySlug,
          brandSlug,
        });
      }
    }
  }

  const brandPages: MetadataRoute.Sitemap = Array.from(
    brandMap.keys()
  ).map((brandSlug) => ({
   url: `${baseUrl}/brands/${brandSlug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  const categoryBrandPages: MetadataRoute.Sitemap = Array.from(
    categoryBrandMap.values()
  ).map(({ categorySlug, brandSlug }) => ({
    url: `${baseUrl}/${categorySlug}/${brandSlug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  const modelPages: MetadataRoute.Sitemap = Array.from(
  modelMap.keys()
).map((modelSlug) => ({
  url: `${baseUrl}/model/${modelSlug}`,
  lastModified: now,
  changeFrequency: "daily" as const,
  priority: 0.82,
}));

return [
  ...staticPages,
  ...blogPages,
  ...brandPages,
  ...modelPages,
  ...categoryBrandPages,
  ...productPages,
];
}