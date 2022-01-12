import { Dispatch } from "redux";
import { RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";

import { auth } from "config/firebase";
import {
  SEND_VERIFICATION_CODE,
  sendVerificationCode as action,
} from "ducks/firebase";
import { buildStatus } from "helpers/buildStatus";
import { getFirebaseError } from "helpers/getFirebaseError";
import { StatusType } from "types.d/Status";

interface SendVerificationCodeParams {
  phoneNumber: string;
  dispatch: Dispatch;
}

export async function sendVerificationCode({
  phoneNumber,
  dispatch,
}: SendVerificationCodeParams) {
  const setStatus = buildStatus(SEND_VERIFICATION_CODE, dispatch);
  setStatus(StatusType.loading);

  try {
    // Always recreate #recaptcha so we don't have to deal with re-rendering
    // issues.
    const recaptchaContainer = document.createElement("div");
    recaptchaContainer.id = "recaptcha";

    const existingRecaptchaContainer = document.querySelector("#recaptcha")!;
    const parent = existingRecaptchaContainer.parentElement!;

    parent.insertBefore(recaptchaContainer, existingRecaptchaContainer);
    parent.removeChild(existingRecaptchaContainer);

    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      { size: "invisible" },
      auth(),
    );

    const provider = new PhoneAuthProvider(auth());

    const verificationId = await provider.verifyPhoneNumber(
      phoneNumber as string,
      recaptchaVerifier,
    );

    dispatch(action({ provider, verificationId }));
    setStatus(StatusType.success);
  } catch (error) {
    const message = getFirebaseError(error);

    setStatus(StatusType.error, new Error(message));
  }
}
