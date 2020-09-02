import { Dispatch } from "redux";

import {
  SEND_VERIFICATION_EMAIL,
  sendVerificationEmail as action,
} from "ducks/firebase";
import { buildStatus } from "helpers/buildStatus";
import { StatusType } from "types.d/Status";

interface SendVerificationEmailParams {
  email: string;
  referrerId: string;
  dispatch: Dispatch;
}

export async function sendVerificationEmail({
  email,
  referrerId,
  dispatch,
}: SendVerificationEmailParams) {
  const setStatus = buildStatus(SEND_VERIFICATION_EMAIL, dispatch);
  setStatus(StatusType.loading);

  const dynamicLinkSettings = {
    android: { installApp: true, packageName: referrerId },
    dynamicLinkDomain: "pasapesos.page.link",
    handleCodeInApp: true,
    iOS: { bundleId: referrerId },
    url: "https://pasapesos.page.link/email-auth",
  };

  firebase
    .auth()
    .sendSignInLinkToEmail(email, dynamicLinkSettings)
    .then(() => {
      dispatch(action());
      setStatus(StatusType.success);
    })
    .catch((error) => {
      setStatus(StatusType.error, new Error(error));
    });
}
