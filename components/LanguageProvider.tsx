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

    const languageSource =
      localStorage.getItem(
        "athmov-language-source"
      );

    const isValidLanguage = (
      value: unknown
    ): value is Language =>
      value === "es" ||
      value === "en" ||
      value === "pt";

    // 1. Elección manual del usuario
    if (
      isValidLanguage(savedLang) &&
      languageSource === "manual"
    ) {
      setLangState(savedLang);

      await saveLanguageToProfile(
        savedLang
      );

      setMounted(true);
      return;
    }

    try {
      // 2. Idioma guardado en el perfil
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } =
          await supabase
            .from("profiles")
            .select("preferred_language")
            .eq("id", user.id)
            .maybeSingle();

        const profileLang =
          profile?.preferred_language;

        if (isValidLanguage(profileLang)) {
          setLangState(profileLang);

          localStorage.setItem(
            "athmov-language",
            profileLang
          );

          localStorage.setItem(
            "athmov-language-source",
            "profile"
          );

          setMounted(true);
          return;
        }
      }

      // 3. Detección automática por país
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
          isValidLanguage(data.lang)
            ? data.lang
            : "en";

        setLangState(detectedLang);

        localStorage.setItem(
          "athmov-language",
          detectedLang
        );

        localStorage.setItem(
          "athmov-language-source",
          "auto"
        );

        await saveLanguageToProfile(
          detectedLang
        );
      } else {
        // 4. Fallback
        setLangState("en");

        localStorage.setItem(
          "athmov-language",
          "en"
        );

        localStorage.setItem(
          "athmov-language-source",
          "auto"
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

      localStorage.setItem(
        "athmov-language-source",
        "auto"
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

    localStorage.setItem(
  "athmov-language-source",
  "manual"
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