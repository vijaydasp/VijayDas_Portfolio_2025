import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    include: ['@babel/runtime', '@babel/runtime/helpers/extends', '@babel/runtime/helpers/createSuper']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
})
