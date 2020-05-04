import { Dispatch } from "redux";

import {
  confirmVerificationCode as action,
  CONFIRM_VERIFICATION_CODE,
} from "ducks/firebase";
import { buildStatus } from "helpers/buildStatus";
import { StatusType } from "types.d/Status";

interface ConfirmVerificationCodeParams {
  verificationId: string;
  verificationCode: string;
  dispatch: Dispatch;
}

export async function confirmVerificationCode({
  verificationId,
  verificationCode,
  dispatch,
}: ConfirmVerificationCodeParams) {
  const setStatus = buildStatus(CONFIRM_VERIFICATION_CODE, dispatch);
  setStatus(StatusType.loading);

  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode,
  );

  try {
    const auth = await firebase.auth().signInWithCredential(credential);
    const idToken = await auth.user!.getIdToken();

    dispatch(action({ idToken }));
    setStatus(StatusType.success);
  } catch (error) {
    setStatus(StatusType.error, error);
  }
}
