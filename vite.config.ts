import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(),tailwindcss()],
  // @ts-ignore
   test: {
    globals: true, 
    environment: 'jsdom', 
    setupFiles: './src/tests/setupTests.ts',
  },
})
