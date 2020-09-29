# recoverysigner-firebase-auth

## Initial setup

- Install [Node.js](https://nodejs.org)
- Install [yarn](https://classic.yarnpkg.com/en/docs/install)
- Run `git clone git@github.com:stellar/recoverysigner-firebase-auth.git`
- Run `cd recoverysigner-firebase-auth && yarn install`
- Create a file under `public/config/env-config.js` with the following code:
  ```js
  window.APP_ENV = {
    FIREBASE_WEB_API_KEY: "your firebase web api key",
    FIREBASE_PROJECT_ID: "your firebase project id",
    TEXT_COLOR: "#fff",
    BACKGROUND_START_COLOR: "#6ececb",
    BACKGROUND_END_COLOR: "#59a4ae",
    LOGO_URL: "https://example.com/logo.svg",
  };
  ```
- Install the [Firebase CLI](https://firebase.google.com/docs/cli)
- Run `firebase login` and follow the instructions
- Run `firebase init`, and enable `Hosting`

## Hosting locally

If you're doing something like making UI changes, you can host the app locally.
To do this:

- Run `yarn start`

## Hosting with Firebase

If you have another app that communicates with this one, and you'd like to test
the interaction between the two during development, you can use Firebase to host
this project. To do this:

- Run `yarn build`
  - This exports the project with any code changes you've made, preparing it for
    deploy.
- Run `firebase deploy`
  - The output of this will contain a 'Hosting URL', where you can view the
    project. To avoid browser caching issues, it's best to use a private
    browsing window.

## Trigger auth with phone

Run the following script in your browser console:

```js
main({ phoneNumber: "+15551112222" });
```

A 6-digit code will be sent to that phone number. To complete sign-in, input the
code on the next screen.

## Trigger auth with email

Run the following script in your browser console:

```js
main({
  email: "jordyn@example.com",
  // Client needs to pass in dynamicLinkSettings, they change depending on the env and are used by Firebase to generate a sign-in link
  dynamicLinkSettings: {
    domain: "pasapesos.page.link", // dynamic link domain
    path: "auth-email", // dynamic link path
    referrerId: "io.sunship.app", // app the dynamic link will send you to
  },
});
```

A link will be sent to that email.

## Building production files

- Run `yarn build`
- Copy the config file to `build/config/env-config.js`
- Serve the `build` directory
