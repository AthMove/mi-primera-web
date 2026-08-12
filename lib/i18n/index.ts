import { es } from "./es";
import { en } from "./en";
import { pt } from "./pt";

export const translations = {
  es,
  en,
  pt,
};

export type Language = keyof typeof translations;
