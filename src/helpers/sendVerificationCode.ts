import { Dispatch } from "redux";

import {
  SEND_VERIFICATION_CODE,
  sendVerificationCode as action,
} from "ducks/firebase";
import { buildStatus } from "helpers/buildStatus";
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
    document.querySelector("#recaptcha")!.replaceWith(recaptchaContainer);

    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha", {
      size: "invisible",
    });

    const provider = new firebase.auth.PhoneAuthProvider(firebase.auth());

    const verificationId = await provider.verifyPhoneNumber(
      phoneNumber as string,
      recaptchaVerifier,
    );

    dispatch(action({ provider, verificationId }));
    setStatus(StatusType.success);
  } catch (error) {
    let message = error.message;

    if (error.code) {
      switch (error.code) {
        case "auth/missing-verification-code":
        case "auth/invalid-verification-code":
          message = "The confirmation code you provided is invalid.";
          break;

        case "auth/missing-phone-number":
        case "auth/invalid-phone-number":
          message = "Please provide a valid phone number.";
          break;

        case "auth/too-many-requests":
          message =
            "You’ve tried to do that too many times. Please wait a while and try again!";
          break;

        case "auth/popup-closed-by-user":
          message = "Please fill out the captcha to proceed.";
          break;

        default:
          message = JSON.parse(message).error.message;
      }
    }

    setStatus(StatusType.error, new Error(message));
  }
}
