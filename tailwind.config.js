/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#040421',
        customGrey: '#21212E',
        customBlack: '#13131F',
        customTop: '#1C1B37',
        customBottom: '#1A1A31',
        customBorder: '#4E4D9D',
        customTopIn: '#37353F',
        customMiddleIn: '#403A53',
        customBottomIn: '#282636',
        customBorderIn: '#464563',
        customBlue: '#1575BA',
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, #1575BA, white)',
      },
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
