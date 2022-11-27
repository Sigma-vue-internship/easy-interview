/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "no-fallthrough": "off",
    "arrow-spacing": ["error", { before: true, after: true }],
    "brace-style": "warn", // Require Brace Style
    "comma-spacing": ["error", { before: false, after: true }],
    complexity: "warn", // Limit Cyclomatic Complexity
    curly: "warn", // Enforce Usage of Spacing in Template Strings
    "default-case": "warn", // Require Default Case in Switch Statements
    "lines-between-class-members": [
      // require or disallow an empty line between class members
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "max-classes-per-file": ["warn", 1], // enforce a maximum number of classes per file
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "no-bitwise": "warn", // disallow bitwise operators
    "no-cond-assign": "warn", // disallow assignment operators in conditional statements
    "no-empty": "warn", // disallow empty block statements
    "newline-before-return": "off", // require an empty line before
    "no-new-wrappers": "warn", // Disallow Primitive Wrapper Instances
    "no-var": "warn",
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: true },
    ],
    "object-shorthand": "warn", // Require Object Literal Shorthand Syntax
    "one-var": ["error", "never"], // enforce variables to be declared either together or separately in functions
    "prettier/prettier": [
      "error",
      {
        semi: true,
        singleQuote: false,
        singleAttributePerLine: true,
        tabWidth: 2,
        trailingComma: "all",
        useTabs: false,
        arrowParens: "avoid",
      },
    ],
    "prefer-const": "warn", // Suggest using const
    "quote-props": ["warn", "as-needed"], // require quotes around object literal property names
    radix: "warn", // Require Radix Parameter
    semi: [2, "always"],
    "space-before-blocks": 1,
    "space-before-function-paren": "off", // Require or disallow a space before function parenthesis
    "space-infix-ops": "error",
    "spaced-comment": [
      // Requires or disallows a whitespace (space or tab) beginning a comment
      "warn",
      "always",
      {
        markers: ["/"],
      },
    ],
    "use-isnan": "warn", // require calls to isNaN() when checking for NaN
    "max-len": ["error", { code: 140 }], // enforce a maximum line length
    indent: ["error", 2], // enforce consistent indentation
    quotes: ["error", "double"],
    "comma-dangle": ["error", "only-multiline"], // require or disallow trailing commas
    "object-curly-spacing": ["error", "always"], // enforce consistent spacing inside braces
    "arrow-parens": ["error", "as-needed"], // Require parens in arrow function arguments
    "newline-per-chained-call": ["error"], // require a newline after each call in a method chain
  },
};
