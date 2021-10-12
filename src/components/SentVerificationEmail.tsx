import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trans } from "@lingui/macro";

import { State } from "types.d/State";
import { Page } from "types.d/Page";
import { setPage } from "ducks/page";

export function SentVerificationEmail() {
  const dispatch = useDispatch();
  const { email } = useSelector((state: State) => state);

  const handleResend = () => {
    dispatch(setPage(Page.sendVerificationEmail));
  };

  return (
    <div className="panel">
      <div>
        <p className="text-center">
          <Trans>
            If the below email address is associated with an account, you will
            receive a verification email.
          </Trans>
        </p>
        <p className="text-center text-bold">{email}</p>
        <p className="text-center">
          <Trans>
            Please check your email on your device and click the verification
            link in the email message to proceed.
          </Trans>
        </p>
      </div>

      <p className="text-center">
        <button className="button-link" type="button" onClick={handleResend}>
          <span>
            <Trans>Resend</Trans>
          </span>
        </button>
      </p>
    </div>
  );
}
