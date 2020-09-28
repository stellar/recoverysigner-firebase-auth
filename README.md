# recoverysigner-firebase-auth

## Local development

### Setup

1. Make sure you have [Node.js](https://nodejs.org) installed.
2. Make sure you have [yarn](https://classic.yarnpkg.com/en/docs/install)
   installed.
3. Clone this repo.
4. Inside the repo directory, run `yarn install`.
5. Create a file under `public/config/env-config.js` with the following code:

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

### Run

To start the app, run `yarn start`.

To trigger the auth process in the browser, run the following script on the web
dev tools:

```js
main({ phoneNumber: "+15551112222" });
```

or

```js
main({
  email: "jordyn@example.com",
  // Client needs to pass in dynamicLinkSettings, they change depending on the env
  dynamicLinkSettings: {
    referrerId: "io.sunship.app",
    domain: "pasapesos.page.link",
    path: "auth-email",
  },
});
```

## Hosting files with Firebase

If you have another app that communicates with this one, and you'd like to test
the interaction between the two during development, you can use Firebase to host
this project.

### Setup

1. Install the [Firebase CLI](https://firebase.google.com/docs/cli).
2. Run `firebase login` and follow the instructions.
3. Run `firebase init`, and enable `Hosting`.

### Development

1. Run `yarn build`. This exports the project with any code changes you've made,
   preparing it for deploy.
2. Run `firebase deploy`. The output of this will contain a 'Hosting URL', where
   you can view the project. To avoid browser caching issues, it's best to use a
   private browsing window.

## Building production files

1. Run `yarn build`.
2. Copy the config file to `build/config/env-config.js`.
3. Serve the `build` directory.
