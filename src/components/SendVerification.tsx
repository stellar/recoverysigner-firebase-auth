import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans } from "@lingui/macro";

import {
  SEND_VERIFICATION_CODE,
  SEND_VERIFICATION_EMAIL,
} from "ducks/firebase";
import { setPage } from "ducks/page";
import { sendVerificationCode } from "helpers/sendVerificationCode";
import { sendVerificationEmail } from "helpers/sendVerificationEmail";
import { useStatus } from "hooks/useStatus";
import { Page } from "types.d/Page";
import { State } from "types.d/State";

const DELAY = 3000;

export function SendVerification() {
  const dispatch = useDispatch();
  const sendCodeStatus = useStatus(SEND_VERIFICATION_CODE);
  const sendEmailStatus = useStatus(SEND_VERIFICATION_EMAIL);
  const [isLoading, setIsLoading] = useState(true);
  const { appDidLoad, phoneNumber, email, dynamicLinkSettings } = useSelector(
    (state: State) => state,
  );

  const handleSendVerification = () => {
    if (appDidLoad) {
      if (phoneNumber) {
        sendVerificationCode({ phoneNumber, dispatch });
      }
      if (email && dynamicLinkSettings) {
        sendVerificationEmail({ email, dynamicLinkSettings, dispatch });
      }
    }
  };

  useEffect(() => {
    handleSendVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appDidLoad, dispatch]);

  useEffect(() => {
    if (sendCodeStatus.isSuccess) {
      dispatch(setPage(Page.confirmVerificationCode));
    }
    if (sendEmailStatus.isSuccess) {
      dispatch(setPage(Page.confirmVerificationEmail));
    }
  }, [sendCodeStatus.isSuccess, sendEmailStatus.isSuccess, dispatch]);

  // We automatically trigger the recaptcha verification. To avoid flashing the
  // "Send verification code" button, we display the button when DELAY has
  // passed.
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
          <p>
            <Trans>Please wait…</Trans>
          </p>
        </div>
      )}

      {sendCodeStatus.error && <p>Error: {sendCodeStatus.error.message}</p>}
      {sendEmailStatus.error && <p>Error: {sendEmailStatus.error.message}</p>}

      {!isLoading && !sendCodeStatus.error && !sendEmailStatus.error && (
        <p className="text-center">
          <button className="button" onClick={handleSendVerification}>
            <span>
              {phoneNumber && <Trans>Send verification code</Trans>}
              {email && <Trans>Send verification email</Trans>}
            </span>
          </button>
        </p>
      )}
    </div>
  );
}
