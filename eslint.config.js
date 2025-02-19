import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import autoImports from "./.wxt/eslint-auto-imports.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
	autoImports,
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	{ settings: { react: { version: "detect" } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{ rules: { "react/react-in-jsx-scope": "off" } },
	eslintConfigPrettier,
];
