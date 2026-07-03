"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../lib/i18n";

type Language = "es" | "en" | "pt";

const LanguageContext = createContext({
  lang: "es" as Language,
  setLang: (lang: Language) => {},
  t: translations.es,
});

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("athmov-language") as Language | null;

    if (savedLang === "es" || savedLang === "en" || savedLang === "pt") {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("athmov-language", lang);
  }, [lang]);

  if (!mounted) return null;
  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);