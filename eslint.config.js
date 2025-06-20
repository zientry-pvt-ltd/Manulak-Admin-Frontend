import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import parserTypeScript from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "react-hooks": reactHooks,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      sonarjs: sonarjs,
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "sonarjs/no-identical-expressions": "error",
      "sonarjs/non-existent-operator": "error",
      "sonarjs/no-use-of-empty-return-value": "error",
      "sonarjs/no-identical-conditions": "error",
      "sonarjs/no-extra-arguments": "error",
      "sonarjs/no-useless-catch": "error",
      "sonarjs/prefer-immediate-return": "error",
      "react-hooks/exhaustive-deps": "error",
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/cognitive-complexity": "off",
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-redux",
              importNames: ["useSelector", "useDispatch"],
              message:
                "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
            },
          ],
        },
      ],

      "no-undef": "off",
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
    },
  },
];
