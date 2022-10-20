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
  } else if (countryFromInput && ["UA", "RU"].includes(countryFromInput)) {
    language = "uk";
  } else {
    language = "en";
  }

  return language;
}
