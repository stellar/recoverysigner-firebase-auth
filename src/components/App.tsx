import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppConfig } from "types.d/AppConfig";
import { Page } from "types.d/Page";
import { State } from "types.d/State";
import { SendVerificationCode } from "components/SendVerificationCode";
import { RequestVerificationCode } from "components/RequestVerificationCode";
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
        case Page.requestVerificationCode:
          setComponent(<RequestVerificationCode />);
          break;

        default:
          setComponent(<SendVerificationCode />);
      }
    }
  }, [appDidLoad, currentPage]);

  return component;
}
