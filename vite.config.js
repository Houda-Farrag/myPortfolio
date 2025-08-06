import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  server: {
    port: 3001, // Set your preferred port
    open: true  // Automatically open browser
  },
  build: {
    minify: 'terser', // Minify code
    sourcemap: true,  // Generate source maps for production
    // rollupOptions: {
    //   output: {
    //     assetFileNames: 'assets/[name]-[hash][extname]',
    //     chunkFileNames: 'assets/[name]-[hash].js',
    //     entryFileNames: 'assets/[name]-[hash].js'
    //   }
    // }
  }
})