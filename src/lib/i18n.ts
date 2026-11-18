import ar from "@/messages/ar.json";
import fa from "@/messages/fa.json";

export type Locale = "ar" | "fa";
export type Dictionary = typeof ar;

const dictionaries = {
  ar,
  fa,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.ar;
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return "rtl"; // Both Arabic and Persian are RTL
}
