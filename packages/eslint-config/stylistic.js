import stylisticJs from "@stylistic/eslint-plugin-js";
import onlyWarn from "eslint-plugin-only-warn";
import eslintPluginPrettier from "eslint-plugin-prettier";
import { prettierConfig } from "./prettier.config.js";
/**
 * A shared ESLint configuration for the repository.
 *
 * @type {object}
 * */

export const stylistic = {
  plugins: {
    "@stylistic/js": stylisticJs,
    onlyWarn,
    prettier: eslintPluginPrettier,
  },
  rules: {
    "@stylistic/js/padded-blocks": ["error", "never"],
    "@stylistic/js/block-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "vue/multi-word-component-names": "off",
    "vue/valid-v-slot": "off",
    semi: ["error", "never"],
    "no-unused-expressions": "off",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      },
    ],
    indent: ["error", 2],
    quotes: ["error", "single", { avoidEscape: true }],
    "no-var": "error",
    "prefer-const": "error",
    "prettier/prettier": ["error", prettierConfig],
  },
};
