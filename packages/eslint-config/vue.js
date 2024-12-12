import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVitest from "@vitest/eslint-plugin";
import pluginCypress from "eslint-plugin-cypress/flat";
import { jstsConfig } from "./js-ts.js";
import { stylistic } from "./stylistic.js";

const vueTSConf = vueTsEslintConfig();

export const vueConfig = [
  // ...jstsConfig,
  ...vueTSConf,
  ...pluginVue.configs["flat/recommended"],
  stylistic,
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/valid-v-slot": "off",
      "vue/no-deprecated-slot-attribute": "off",
    },
  },
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,vue}"],
  },
  {
    ...pluginVitest.configs.recommended,
    files: ["**/__tests__/*"],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
      "cypress/support/**/*.{js,ts,jsx,tsx}",
    ],
  },
  // skipFormatting,
  {
    plugins: {
      "typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: "./tsconfig.app.json",
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
  },
  eslintConfigPrettier,
];
