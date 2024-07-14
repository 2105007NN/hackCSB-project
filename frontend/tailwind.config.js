// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   // eslint-disable-next-line no-undef
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: ["sunset"], // Set the default theme to "night"
//   },

// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin') // Assuming this is the package for React Flowbite
  ],
  daisyui: {
    themes: ["sunset"], // Set the default theme to "sunset" for DaisyUI
  },
};

