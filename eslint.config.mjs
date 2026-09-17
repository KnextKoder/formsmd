import globals from "globals";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: ["dist/**", "lib/**", "types/**", "node_modules/**"],
	},
	{
		files: ["**/*.js", "**/*.ts", "**/*.mjs"],
		languageOptions: {
			parser: tsParser,
			sourceType: "module",
			globals: { ...globals.browser, ...globals.node },
		},
		rules: {
			"dot-notation": "error",
			"curly": "error",
		},
	},
];
