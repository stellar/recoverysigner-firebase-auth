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
