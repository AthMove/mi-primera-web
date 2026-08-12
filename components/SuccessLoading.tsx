"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function SuccessLoading() {
  const { t } = useLanguage();

  return <main>{t.successLoading}</main>;
}