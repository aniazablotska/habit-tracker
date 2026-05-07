import js from "@eslint/js";
import globals from "globals"; // Додаємо цей імпорт

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      // Цей рядок каже ESLint, що ми працюємо в браузері
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];
