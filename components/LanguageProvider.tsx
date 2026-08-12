"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { translations } from "@/lib/i18n";

type Language = "es" | "en" | "pt";

const LanguageContext = createContext({
  lang: "es" as Language,
  setLang: (_lang: Language) => {},
  t: translations.es,
});

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] =
    useState<Language>("es");

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      const savedLang =
        localStorage.getItem(
          "athmov-language"
        ) as Language | null;

      // Si el usuario ya eligió idioma,
      // respetamos siempre su elección.
      if (
        savedLang === "es" ||
        savedLang === "en" ||
        savedLang === "pt"
      ) {
        setLangState(savedLang);
        setMounted(true);
        return;
      }

      // Primera visita:
      // detectamos el país desde Vercel.
      try {
        const response = await fetch(
          "/api/language",
          {
            cache: "no-store",
          }
        );

        if (response.ok) {
          const data = await response.json();

          const detectedLang =
            data.lang === "es" ||
            data.lang === "pt" ||
            data.lang === "en"
              ? data.lang
              : "en";

          setLangState(detectedLang);

          localStorage.setItem(
            "athmov-language",
            detectedLang
          );
        } else {
          setLangState("en");
        }
      } catch {
        setLangState("en");
      }

      setMounted(true);
    };

    initializeLanguage();
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);

    localStorage.setItem(
      "athmov-language",
      newLang
    );
  };

  if (!mounted) {
    return null;
  }

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

export const useLanguage = () =>
  useContext(LanguageContext);