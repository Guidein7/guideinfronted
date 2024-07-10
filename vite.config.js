
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows Vite to listen on all addresses (0.0.0.0)
    port: 5173   // Change this to the desired port, e.g., 3000
  }
})