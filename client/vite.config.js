import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure the base path is correct for the dev server
  server: {
    host: 'localhost', 
    port: 5173,
  },
  // If your index.html is in /public, you may need a base path fix for deployment, 
  // but for local dev, it should be fine if index.html is in the root.
})