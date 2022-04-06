module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            transitionDuration: {
                '2000': '2000ms',
                '10000': '10s',
            },
            animation: {
                'spin-slow': 'spin 10s linear infinite',
            },
            ringWidth: {
                'DEFAULT': '2px',
                '6': '6px',
                '10': '10px',
                '20': '20px',
                '30': '30px',
                '40': '40px',
                '50': '50px',
            },
            blur: {
                '4xl': '96px',
            },
            transitionTimingFunction: {
                'in-expo-out': 'cubic-bezier( 0.22, 0.61, 0.36, 1)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
