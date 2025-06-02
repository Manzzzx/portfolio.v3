import js from "@eslint/js";
import * as next from "eslint-plugin-next";
import tseslint from "typescript-eslint";

export default [
  // Base JS rules
  js.configs.recommended,

  // TypeScript + Type-aware rules
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }, // Ignore unused params like `_ref`
      ],
    },
  },

  // Next.js rules
  {
    plugins: { next },
    rules: {
      ...next.configs["core-web-vitals"].rules,
    },
  },
  // Optional: test file overrides
  {
    files: ["**/__tests__/**/*.ts", "**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
