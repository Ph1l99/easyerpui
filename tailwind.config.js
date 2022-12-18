/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: ['bg-lime-500', 'bg-violet-600', 'bg-teal-500', 'bg-rose-700'],
    theme: {
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
        },
        extend: {},
    },
    plugins: [],
};
