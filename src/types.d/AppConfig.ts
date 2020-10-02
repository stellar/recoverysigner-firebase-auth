export interface DynamicLinkSettings {
  referrerId: string;
  domain: string;
  path: string;
}

export interface AppConfig {
  // required for 'auth with phone'
  phoneNumber?: string;

  // required for 'auth with email'
  email?: string;
  dynamicLinkSettings?: DynamicLinkSettings;

  // required for 'confirm auth with email'
  signInLink?: string;

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  language: string;
}
