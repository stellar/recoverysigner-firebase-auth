import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import { App } from "components/App";
import { store } from "ducks/store";

(window as any).main = function main(config: any) {
  if (config.firebase) {
    firebase.initializeApp(config.firebase);
  }

  const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha", {
    size: "invisible",
  });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App config={{ ...config, recaptchaVerifier }} />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
};
