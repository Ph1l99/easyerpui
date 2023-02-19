/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        'bg-lime-500',
        'bg-violet-600',
        'bg-teal-500',
        'bg-rose-700',
        'bg-pink-400',
        'bg-yellow-500',
        'outline-lime-500',
        'outline-violet-600',
        'outline-teal-500',
        'outline-rose-700',
        'outline-pink-400',
        'outline-yellow-500',
    ],
    theme: {
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
        },
        extend: {},
    },
    plugins: [],
};
