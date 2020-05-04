# recoverysigner-firebase-auth

## Running in development

1. Make sure you have [Node.js](https://nodejs.org) installed.
2. Make sure you have [yarn](https://yarnpkg.com) installed.
3. Clone this repo
4. Inside the repo directory, run `yarn install`.
5. Create a file under `public/config.js` with the following code:

```js
window.APP_ENV = {
  FIREBASE_WEB_API_KEY: "your firebase web api key",
  FIREBASE_PROJECT_ID: "your firebaes project id",
  TEXT_COLOR: "#fff",
  BACKGROUND_START_COLOR: "#6ececb",
  BACKGROUND_END_COLOR: "#59a4ae",
  LOGO_URL: "https://example.com/logo.svg",
};
```

To start the app, run `yarn start`.

To trigger the auth process in the browser, run the following script on the web
dev tools:

```js
main({
  phoneNumber: "+15551112222",
  firebase: {
    apiKey: window.APP_ENV.FIREBASE_WEB_API_KEY,
    projectId: window.APP_ENV.FIREBASE_PROJECT_ID,
  },
});
```

## Building production files

1. Run `yarn build`.
2. Copy the config file to `build/config.js`.
3. Serve the `build` directory.

## Hosting files with Firebase

1. Run `firebase login` and follow the instructions.
2. Run `firebase init`, and enable `Hosting`. Then, choose your Firebase app or
   create a new one.
3. Export the project using `yarn build`. Don't forget to provide the
   environment variables as described above.
4. Run `firebase deploy`.
