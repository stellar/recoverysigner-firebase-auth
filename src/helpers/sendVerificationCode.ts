import { Dispatch } from "redux";

import { sendVerificationCode as action } from "ducks/firebase";

interface SendVerificationCodeParams {
  phoneNumber: string;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  dispatch: Dispatch;
}

export async function sendVerificationCode({
  phoneNumber,
  recaptchaVerifier,
  dispatch,
}: SendVerificationCodeParams) {
  const provider = new firebase.auth.PhoneAuthProvider(firebase.auth());
  const verificationId = await provider.verifyPhoneNumber(
    phoneNumber as string,
    recaptchaVerifier,
  );

  dispatch(action({ provider, verificationId }));
}
