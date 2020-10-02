import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans } from "@lingui/macro";

import { SEND_VERIFICATION_EMAIL } from "ducks/firebase";
import { setPage } from "ducks/page";
import { sendVerificationEmail } from "helpers/sendVerificationEmail";
import { useStatus } from "hooks/useStatus";
import { Page } from "types.d/Page";
import { State } from "types.d/State";

export function SendVerificationEmail() {
  const dispatch = useDispatch();
  const sendEmailStatus = useStatus(SEND_VERIFICATION_EMAIL);
  const { email, dynamicLinkSettings } = useSelector((state: State) => state);

  useEffect(() => {
    if (email && dynamicLinkSettings) {
      sendVerificationEmail({ email, dynamicLinkSettings, dispatch });
    }
  }, [email, dynamicLinkSettings, dispatch]);

  useEffect(() => {
    if (sendEmailStatus.isSuccess) {
      dispatch(setPage(Page.sentVerificationEmail));
    }
  }, [sendEmailStatus.isSuccess, dispatch]);

  return (
    <div className="panel">
      <div className="text-center text-large">
        <p>
          <Trans>Please wait…</Trans>
        </p>
      </div>

      {sendEmailStatus.error && (
        <p>
          <Trans>Error: {sendEmailStatus.error.message}</Trans>
        </p>
      )}
    </div>
  );
}
