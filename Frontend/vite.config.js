import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    port: 3000,
    historyApiFallback: true
  },
  define: {
    'process.env': {}
  }
})


