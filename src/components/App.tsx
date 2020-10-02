import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppConfig } from "types.d/AppConfig";
import { Page } from "types.d/Page";
import { State } from "types.d/State";
import { ConfirmVerificationCode } from "components/ConfirmVerificationCode";
import { SentVerificationEmail } from "components/SentVerificationEmail";
import { Landing } from "components/Landing";
import { SendVerificationCode } from "components/SendVerificationCode";
import { SendVerificationEmail } from "components/SendVerificationEmail";
import { initApp } from "ducks/app";

interface AppProps {
  config: AppConfig;
}

export function App({ config }: AppProps) {
  const dispatch = useDispatch();
  const [component, setComponent] = useState<React.ReactElement>(<></>);
  const { appDidLoad, currentPage } = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(initApp(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (appDidLoad) {
      switch (currentPage) {
        case Page.sendVerificationCode:
          setComponent(<SendVerificationCode />);
          break;

        case Page.confirmVerificationCode:
          setComponent(<ConfirmVerificationCode />);
          break;

        case Page.sendVerificationEmail:
          setComponent(<SendVerificationEmail />);
          break;

        case Page.sentVerificationEmail:
          setComponent(<SentVerificationEmail />);
          break;

        default:
          setComponent(<Landing />);
      }
    }
  }, [appDidLoad, currentPage]);

  return component;
}
