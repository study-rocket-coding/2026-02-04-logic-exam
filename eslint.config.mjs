import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier"; // 匯入 Prettier 設定

export default defineConfig([
  {
    ignores: ["node_modules/", "dist/", "exam.js"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      ...js.configs.recommended.rules,

      // 強制要求宣告時必須賦值 (針對 let)
      // 如果寫 let a; 就會報錯
      "init-declarations": ["error", "always"],

      // 禁止使用 var，強制用 let/const (符合現代標準)
      "no-var": "error",
    },
  },
  eslintConfigPrettier, // 放在陣列最後一項
]);
