/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: [
		'/src/**/*.{html,ts}',
		'./src/**/*.{html,ts}',
		'./src/app/**/*.{html,ts}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#0C8346',
				secondary: '#329F5B',
				third: '#8FD5A6',
				misc: '#0D5D56',
			},
		},
	},
	plugins: [],
};
