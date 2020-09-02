import { FirebaseAppConfig } from "@firebase/app-types";
import { Page } from "types.d/Page";
import { Status } from "types.d/Status";

export interface State {
  phoneNumber: string;
  email: string;
  referrerId: string;
  currentPage: Page;
  appDidLoad: boolean;
  statuses: { [key: string]: Status };

  firebase: FirebaseAppConfig;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  verificationId: string;
  provider: firebase.auth.PhoneAuthProvider;
  idToken: string;
}
