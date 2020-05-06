import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import { App } from "components/App";
import { store } from "ducks/store";
import { AppConfig } from "types.d/AppConfig";

(window as any).main = function main(config: AppConfig) {
  const appEnv = (window as any).APP_ENV;

  firebase.initializeApp({
    apiKey: appEnv.FIREBASE_WEB_API_KEY,
    projectId: appEnv.FIREBASE_PROJECT_ID,
  });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App config={{ ...config }} />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
};
