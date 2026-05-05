import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn", // попереджати про невикористані змінні
      "no-undef": "warn", // попереджати про невизначені змінні
    },
    languageOptions: {
      globals: {
        document: "readonly",
        console: "readonly",
        import: "readonly",
      },
    },
  },
];
