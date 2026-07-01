"use client";

import { createContext, useContext, useState } from "react";
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