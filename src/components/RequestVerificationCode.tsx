import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { State } from "types.d/State";
import { Page } from "types.d/Page";
import { confirmVerificationCode } from "helpers/confirmVerificationCode";
import { useStatus } from "hooks/useStatus";
import { CONFIRM_VERIFICATION_CODE } from "ducks/firebase";
import { setPage } from "ducks/page";

export function RequestVerificationCode() {
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState("");
  const { verificationId, idToken } = useSelector((state: State) => state);
  const status = useStatus(CONFIRM_VERIFICATION_CODE);

  useEffect(() => {
    if (verificationCode.match(/^\d{6}$/)) {
      confirmVerificationCode({
        verificationCode,
        verificationId,
        dispatch,
      });
    }
  }, [verificationId, verificationCode, dispatch]);

  useEffect(() => {
    if (status.isSuccess) {
      window.postMessage(
        JSON.stringify({ type: "idToken", idToken }),
        window.location.origin,
      );
    }
  }, [status.hasLoaded, status.isSuccess, idToken]);

  const handleResend = () => {
    dispatch(setPage(Page.sendVerificationCode));
  };

  if (status.isSuccess) {
    return (
      <div className="panel">
        <p className="text-center text-large">
          You’ve been verified! Please wait.
        </p>
      </div>
    );
  }

  return (
    <div className="panel">
      {!status.isSuccess && (
        <div>
          <p className="text-center">We’ve sent you a verification code:</p>

          <label>
            <input
              maxLength={6}
              autoComplete="one-time-code"
              inputMode="numeric"
              type="text"
              pattern="^\d{6}$"
              onChange={({ target: { value } }) => setVerificationCode(value)}
              disabled={status.isLoading}
            />
          </label>
        </div>
      )}

      {status.error && <div className="error">{status.error.toString()}</div>}

      {!status.isLoading && (
        <p className="text-center">
          <button className="button-link" type="button" onClick={handleResend}>
            <span>Resend</span>
          </button>
        </p>
      )}
    </div>
  );
}
