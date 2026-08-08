import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import BrandsClient from "@/components/brands/BrandsClient";

export const metadata: Metadata = {
  title: "Marcas deportivas de segunda mano | ATHMOV",
  description:
    "Explora las marcas premium disponibles en ATHMOV. Material de pádel, golf, tenis y running de segunda mano.",
  alternates: {
    canonical: "https://athmov.com/brands",
  },
};

export const revalidate = 300;

type ProductBrand = {
  brand: string | null;
  category: string | null;
};

type BrandItem = {
  name: string;
  count: number;
  category: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getBrands(): Promise<BrandItem[]> {
  const { data, error } = await supabase
    .from("products")
    .select("brand,category")
    .eq("moderation_status", "approved")
    .eq("sold", false)
    .not("brand", "is", null);

  if (error) {
    console.error("Error cargando las marcas:", error);
    return [];
  }

const brandMap = new Map<
  string,
  {
    name: string;
    count: number;
    category: string;
  }
>();

for (const product of (data || []) as ProductBrand[]) {
  const brand = product.brand?.trim();
  const category = product.category?.trim() || "OTROS";

  if (!brand) continue;

  const normalizedBrand = `${category}-${slugify(brand)}`;
  const existingBrand = brandMap.get(normalizedBrand);

  if (existingBrand) {
    existingBrand.count += 1;
  } else {
    brandMap.set(normalizedBrand, {
      name: brand,
      count: 1,
      category: category,
    });
  }
}

  return Array.from(brandMap.values()).sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return a.name.localeCompare(b.name, "es", {
      sensitivity: "base",
    });
  });
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return <BrandsClient brands={brands} />;
}