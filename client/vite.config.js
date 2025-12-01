import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'  
  },
  base: '/',       
  server: {
    proxy: {
      '/api': 'http://localhost:3000' 
    }
  }
})