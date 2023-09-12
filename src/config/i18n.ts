import { Catalog, setupI18n } from "@lingui/core";
import { t } from "@lingui/macro";

import en from "locales/en/messages";
import es from "locales/es/messages";
import esAR from "locales/es-AR/messages";
import fr from "locales/fr/messages";
import uk from "locales/uk/messages";
import ru from "locales/ru/messages";

export const catalogs: { [key: string]: Catalog } = {
  en,
  es,
  "es-AR": esAR,
  fr,
  uk,
  ru,
};

export const i18n = setupI18n({
  language: "en",
  catalogs,
});

// Strings that need to be translated because they're being used on index.html
t`Please update Android WebView to start the session.`;
t`Please update Google Chrome to start the session.`;
t`Your device’s browser is not compatible. Please update your browser and Vibrant to the latest version.`;
