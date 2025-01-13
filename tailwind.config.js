/** @type {import('tailwindcss').Config} */
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
	plugins: [require("@tailwindcss/container-queries"), require("daisyui")],
};
