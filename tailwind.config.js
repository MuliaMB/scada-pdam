// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  theme: {
    extend: {
      fontFamily: {
        // Poppins sebagai font default untuk semua teks (font-sans)
        sans: ['var(--font-poppins)', 'sans-serif'], 
        
        // Geist Mono dipertahankan untuk font monospaced (font-mono)
        mono: ['var(--font-geist-mono)', 'monospace'], 
      },
    },
  },
  // ...
};