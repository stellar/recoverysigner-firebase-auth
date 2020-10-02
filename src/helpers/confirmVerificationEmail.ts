import { Dispatch } from "redux";

import {
  confirmVerificationCode as action,
  CONFIRM_VERIFICATION_EMAIL,
} from "ducks/firebase";
import { buildStatus } from "helpers/buildStatus";
import { getFirebaseError } from "helpers/getFirebaseError";
import { StatusType } from "types.d/Status";

interface ConfirmVerificationEmailParams {
  verificationUrl: string;
  verificationEmail: string;
  dispatch: Dispatch;
}

export async function confirmVerificationEmail({
  verificationUrl,
  verificationEmail,
  dispatch,
}: ConfirmVerificationEmailParams) {
  const setStatus = buildStatus(CONFIRM_VERIFICATION_EMAIL, dispatch);
  setStatus(StatusType.loading);

  try {
    const auth = await firebase
      .auth()
      .signInWithEmailLink(verificationEmail, verificationUrl);
    const idToken = await auth.user!.getIdToken();

    dispatch(action({ idToken }));
    setStatus(StatusType.success);
  } catch (error) {
    const message = getFirebaseError(error);

    setStatus(StatusType.error, new Error(message));
  }
}
