module.exports = {
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src/"],
      exclude: ["**/node_modules/**"],
    },
  ],
  compileNamespace: "cjs",
  extractBabelOptions: {
    presets: ["@babel/react"],
  },
  compilerBabelOptions: {},
  fallbackLocales: {},
  format: "po",
  locales: ["en", "es"],
  extractors: ["babel"],
  orderBy: "messageId",
  pseudoLocale: "",
  rootDir: ".",
  runtimeConfigModule: ["@lingui/core", "i18n"],
  sourceLocale: "en",
};
