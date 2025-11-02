import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
      '@babel/runtime/helpers': path.resolve(__dirname, 'node_modules/@babel/runtime/helpers'),
    },
  },
  optimizeDeps: {
    include: [
      '@babel/runtime',
      '@babel/runtime/helpers/extends',
      '@babel/runtime/helpers/createSuper',
      '@babel/runtime/helpers/objectWithoutPropertiesLoose',
      '@babel/runtime/helpers/typeof',
    ],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // can add chunk splitting later if bundle too large
      },
    },
  },
})
