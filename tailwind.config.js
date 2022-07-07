/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: "tw-",
	content: ["./src/**/*.{html,js,jsx,ts,tsx,css,scss,sass}"],
	darkMode: "class",
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
