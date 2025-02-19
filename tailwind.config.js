/** @type {import('tailwindcss').Config} */
import containerQueries from "@tailwindcss/container-queries";
import daisyui from "daisyui";

export default {
	content: ["src/assets/**", "src/entrypoints/**", "src/components/**"],
	theme: {
		extend: {
			screens: {
				"max-lg": { max: "1367px" },
				"max-xl": { max: "1391px" },
			},
		},
	},
	plugins: [containerQueries, daisyui],
};
