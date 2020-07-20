import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SEND_VERIFICATION_CODE } from "ducks/firebase";
import { setPage } from "ducks/page";
import { sendVerificationCode } from "helpers/sendVerificationCode";
import { useStatus } from "hooks/useStatus";
import { Page } from "types.d/Page";
import { State } from "types.d/State";

const DELAY = 3000;

export function SendVerificationCode() {
  const dispatch = useDispatch();
  const status = useStatus(SEND_VERIFICATION_CODE);
  const [isLoading, setIsLoading] = useState(true);
  const { appDidLoad, verificationId, phoneNumber } = useSelector(
    (state: State) => state,
  );

  const handleSendVerificationCode = () => {
    if (appDidLoad) {
      sendVerificationCode({
        phoneNumber,
        dispatch,
      });
    }
  };

  useEffect(() => {
    handleSendVerificationCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appDidLoad, phoneNumber, dispatch]);

  useEffect(() => {
    if (verificationId) {
      dispatch(setPage(Page.requestVerificationCode));
    }
  }, [verificationId, dispatch]);

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
          <p>Please wait…</p>
        </div>
      )}

      {status.error && <p>Error: {status.error.message}</p>}

      {!isLoading && !status.error && (
        <p className="text-center">
          <button className="button" onClick={handleSendVerificationCode}>
            <span>Send verification code</span>
          </button>
        </p>
      )}
    </div>
  );
}
