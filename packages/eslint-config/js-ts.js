import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import globals from "globals";
import { stylistic } from "./stylistic.js";
import { prettierConfig } from "./prettier.config.js";
/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const jstsConfig = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  stylistic,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ["dist/**"],
  },
];
