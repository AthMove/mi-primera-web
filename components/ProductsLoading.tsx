"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function ProductsLoading() {
  const { t } = useLanguage();

  return <main>{t.productsLoading}</main>;
}