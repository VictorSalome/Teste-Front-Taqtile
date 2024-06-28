// @ts-check

import eslint from "@eslint/js";
import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";

export default {
  ...eslint.configs.recommended,
  ...tsConfigs.recommended,
  ...tsConfigs.strict,
  ...tsConfigs.stylistic,
  rules: {
    "prettier/prettier": [
      "error",
      {},
      {
        "usePrettierrc": false
      }
    ]
  }
};