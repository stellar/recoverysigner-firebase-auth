export interface AppConfig {
  phoneNumber: string;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  locale: string;
}
