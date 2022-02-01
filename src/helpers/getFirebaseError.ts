import { i18n } from "@lingui/core";

interface FirebaseError extends Error {
  code: string;
  message: string;
  stack?: string;
}

export function getFirebaseError(error: FirebaseError | Error) {
  if (!("code" in error)) {
    if ((window as any).Sentry) {
      (window as any).Sentry.captureException(new Error(error.toString()));
    }
    return error.toString();
  }

  if ((window as any).Sentry) {
    (window as any).Sentry.captureException(
      new Error(`${error.code}: ${error.message}`),
    );
  }

  switch (error.code) {
    case "auth/missing-verification-code":
    case "auth/invalid-verification-code":
      return i18n._(`The confirmation code you provided is invalid.`);

    case "auth/missing-phone-number":
    case "auth/invalid-phone-number":
      return i18n._(`Please provide a valid phone number.`);

    case "auth/too-many-requests":
      return i18n._(`You’ve tried to do that too many times. Please
      wait a while and try again!`);

    case "auth/popup-closed-by-user":
      return i18n._(`Please fill out the captcha to proceed.`);

    case "auth/email-already-in-use":
      return i18n._(`This email is already in use. Please use another one.`);

    case "auth/network-request-failed":
      return i18n._(
        `There was a network connectivity issue. Please try again.`,
      );

    // These errors are "retry later" ones
    // but don't track these!
    case "auth/session-expired":
    case "auth/app-not-authorized":
    case "auth/retry-phone-auth":
      return i18n._(`Oops! Please try again in a few minutes.
      (error code: ${error.code})`);

    // Track error codes we don't know
    // (includes auth/app-not-authorized and auth/unknown)
    default:
      return i18n._(`Oops! Please try again in a few minutes.
      (error code: ${error.code})`);
  }
}
