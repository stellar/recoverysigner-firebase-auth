import { Catalog, setupI18n } from "@lingui/core";

import en from "locales/en/messages";
import es from "locales/es/messages";
import uk from "locales/uk/messages";

const catalogs: { [key: string]: Catalog } = {
  en,
  es,
  uk,
};

export const i18n = setupI18n({
  language: "en",
  catalogs,
});

// Strings that need to be translated because they're being used on index.html
i18n.t`Please update Android WebView to start the session.`;
i18n.t`Please update Google Chrome to start the session.`;
i18n.t`Your device’s browser is not compatible. Please update your browser and Vibrant to the latest version.`;
