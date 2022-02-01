module.exports = {
  extends: ["@stellar/eslint-config"],
  globals: {
    firebase: "readonly",
  },
  rules: {
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": ["error", { extensions: ["js", "tsx"] }],
    "react/prop-types": "off",
    "valid-jsdoc": "off",
    "import/extensions": "off",
    "@typescript-eslint/naming-convention": ["warn"],
  },
};
