import { FirebaseOptions } from "firebase/app";
import { RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";
import { DynamicLinkSettings } from "types.d/AppConfig";
import { Page } from "types.d/Page";
import { Status } from "types.d/Status";

export interface State {
  phoneNumber?: string;

  email?: string;
  dynamicLinkSettings?: DynamicLinkSettings;

  signInLink?: string;

  currentPage: Page;
  appDidLoad: boolean;
  statuses: { [key: string]: Status };

  firebase: FirebaseOptions;
  recaptchaVerifier: RecaptchaVerifier;
  verificationId: string;
  provider: PhoneAuthProvider;
  idToken: string;
}
