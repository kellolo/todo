// const uiKitConfig = require("../../packages/ui-kit/tailwind.config.js");

export default {
  // presets: [uiKitConfig],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', '../../packages/ui-kit/src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#FF4500',
      },
    },
  },
  plugins: [],
}
