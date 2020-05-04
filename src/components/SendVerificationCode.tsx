import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPage } from "ducks/page";
import { sendVerificationCode } from "helpers/sendVerificationCode";
import { Page } from "types.d/Page";
import { State } from "types.d/State";

const DELAY = 3000;

export function SendVerificationCode() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const {
    appDidLoad,
    verificationId,
    phoneNumber,
    recaptchaVerifier,
  } = useSelector((state: State) => state);

  useEffect(() => {
    if (appDidLoad) {
      sendVerificationCode({
        phoneNumber,
        recaptchaVerifier,
        dispatch,
      });
    }
  }, [appDidLoad, phoneNumber, recaptchaVerifier, dispatch]);

  useEffect(() => {
    if (verificationId) {
      dispatch(setPage(Page.requestVerificationCode));
    }
  }, [verificationId, dispatch]);

  // We automatically trigger the recaptcha verification. To avoid flashing the
  // "Send verification code" button, we display the button DELAY has passed.
  useEffect(() => {
    const tid = setTimeout(() => {
      setIsLoading(false);
    }, DELAY);

    return () => clearTimeout(tid);
  }, []);

  return (
    <div className="panel">
      {isLoading && (
        <div className="text-center text-large">
          <p>Please wait…</p>
        </div>
      )}

      {!isLoading && (
        <p className="text-center">
          <button className="button">
            <span>Send verification code</span>
          </button>
        </p>
      )}
    </div>
  );
}
