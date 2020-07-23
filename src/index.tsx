import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { I18nProvider } from "@lingui/react";

import "./index.css";
import { i18n } from "config/i18n";
import { App } from "components/App";
import { store } from "ducks/store";
import { AppConfig } from "types.d/AppConfig";

(window as any).main = function main(config: AppConfig) {
  const appEnv = (window as any).APP_ENV;
  const language = config.language || "en";

  firebase.initializeApp({
    apiKey: appEnv.FIREBASE_WEB_API_KEY,
    projectId: appEnv.FIREBASE_PROJECT_ID,
  });

  i18n.activate(language);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <I18nProvider i18n={i18n} language={language}>
          <App config={{ ...config }} />
        </I18nProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
};
