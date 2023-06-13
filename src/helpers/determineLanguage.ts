import { catalogs } from "config/i18n";

// input could be in both "en" and "en-US" formats
export function determineLanguage(input: string): string {
  let language;

  const [languageFromInput, countryFromInput] = input.split("-");

  if (input in catalogs) {
    language = input;
  } else if (languageFromInput in catalogs) {
    language = languageFromInput;
  } else if (countryFromInput && countryFromInput === "AR") {
    language = "es-AR";
  } else if (countryFromInput && countryFromInput === "UA") {
    language = "uk";
  } else if (countryFromInput && countryFromInput === "RU") {
    language = "ru";
  } else {
    language = "en";
  }

  return language;
}
