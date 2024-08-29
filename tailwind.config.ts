import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#38007C",
				"primary-600": "#38007ca8",
				"primary-500": "#38007ca8",
				"primary-700": "#38007c6b",
				"hover-primary-500": "#38007ca8",
				secondary: "#ffffff",
				"transparent-700": "#282727",
			},
		},
	},
	plugins: [],
};
export default config;
