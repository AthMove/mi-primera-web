"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

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

  const saveLanguageToProfile = async (
    language: Language
  ) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await supabase
        .from("profiles")
        .update({
          preferred_language: language,
        })
        .eq("id", user.id);
    } catch (error) {
      console.log(
        "LANGUAGE PROFILE SYNC ERROR:",
        error
      );
    }
  };

  useEffect(() => {
    const initializeLanguage = async () => {
      const savedLang =
        localStorage.getItem(
          "athmov-language"
        ) as Language | null;

      if (
        savedLang === "es" ||
        savedLang === "en" ||
        savedLang === "pt"
      ) {
        setLangState(savedLang);

        await saveLanguageToProfile(
          savedLang
        );

        setMounted(true);
        return;
      }

      try {
        const response = await fetch(
          "/api/language",
          {
            cache: "no-store",
          }
        );

        if (response.ok) {
          const data =
            await response.json();

          const detectedLang: Language =
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

          await saveLanguageToProfile(
            detectedLang
          );
        } else {
          setLangState("en");

          localStorage.setItem(
            "athmov-language",
            "en"
          );

          await saveLanguageToProfile(
            "en"
          );
        }
      } catch {
        setLangState("en");

        localStorage.setItem(
          "athmov-language",
          "en"
        );

        await saveLanguageToProfile(
          "en"
        );
      }

      setMounted(true);
    };

    initializeLanguage();
  }, []);

  const setLang = (
    newLang: Language
  ) => {
    setLangState(newLang);

    localStorage.setItem(
      "athmov-language",
      newLang
    );

    void saveLanguageToProfile(
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