export interface DynamicLinkSettings {
  referrerId: string;
  domain: string;
  path: string;
}

export interface AppConfig {
  phoneNumber: string;
  email: string;
  dynamicLinkSettings?: DynamicLinkSettings;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  language: string;
}
