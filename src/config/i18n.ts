import { Catalog, setupI18n } from "@lingui/core";

import en from "locales/en/messages";

const catalogs: { [key: string]: Catalog } = {
  en,
};

export const i18n = setupI18n({
  language: "en",
  catalogs,
});
