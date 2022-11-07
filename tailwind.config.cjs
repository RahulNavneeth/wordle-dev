/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				primary: ["'Bitter'", 'serif'],
				courier: ["'Courier Prime'", 'monospace']
			},
			keyframes: {
				shake: {
					'10%, 90%': {
						transform: 'translate3d(-1px, 0, 0)'
					},

					'20%, 80%': {
						transform: 'translate3d(2px, 0, 0)'
					},

					'30%, 50%, 70% ': {
						transform: 'translate3d(-4px, 0, 0)'
					},

					'40%, 60%': {
						transform: 'translate3d(4px, 0, 0)'
					}
				}
			},
			animation: {
				shake: 'shake 1s ease-in-out infinite'
			}
		}
	},
	plugins: []
};
