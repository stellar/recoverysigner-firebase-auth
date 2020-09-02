export interface AppConfig {
  phoneNumber: string;
  email: string;
  referrerId: string;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  language: string;
}
