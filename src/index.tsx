import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import * as Sentry from "@sentry/browser";

import "./index.css";
import { initializeFirebase, auth } from "config/firebase";
import { App } from "components/App";
import { store } from "ducks/store";
import { AppConfig } from "types.d/AppConfig";

(window as any).Sentry = Sentry;

if ((window as any).APP_ENV) {
  Sentry.init({
    dsn: (window as any).APP_ENV.SENTRY_DSN,
  });
}

(window as any).main = function main(config: AppConfig) {
  (window as any).wasInitted = true;

  const appEnv = (window as any).APP_ENV;
  const language = config.language || "en";

  initializeFirebase({
    apiKey: appEnv.FIREBASE_WEB_API_KEY,
    projectId: appEnv.FIREBASE_PROJECT_ID,
  });

  auth().languageCode = language;

  i18n.activate(language);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <I18nProvider i18n={i18n}>
          <App config={{ ...config }} />
        </I18nProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
};
