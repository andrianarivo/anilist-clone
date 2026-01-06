/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		fontFamily: {
			regular: ["Roboto_400Regular"],
			medium: ["Roboto_500Medium"],
			bold: ["Roboto_700Bold"],
			thin: ["Roboto_100Thin"],
			light: ["Roboto_300Light"],
		},
		extend: {
			colors: {
				neutral100: "#FFFFFF",
				neutral200: "#F4F2F1",
				neutral300: "#D7CEC9",
				neutral400: "#B6ACA6",
				neutral500: "#978F8A",
				neutral600: "#564E4A",
				neutral700: "#3C3836",
				neutral800: "#1e1e22",
				neutral900: "#000000",
				"deep-dark": "#18181b",
				default: "#1a1a1d",
			},
		},
	},
	plugins: [],
};
