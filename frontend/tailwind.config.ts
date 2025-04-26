import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './index.html',
    ],
    safelist: [
        'bg-white/30',
        'bg-gray-100',
        'text-black',
        'text-white',
        'hover:underline',
        'border-none',
        'focus:outline-none',
        'focus:ring-0',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config