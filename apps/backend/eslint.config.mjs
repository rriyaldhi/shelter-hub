import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["eslint.config.mjs", "dist/**", "node_modules/**"]
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "commonjs",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn"
    }
  },
  {
    files: ["test/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off"
    }
  }
);
