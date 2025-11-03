import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import sitemap from 'vite-plugin-sitemap' // ✅ Added plugin

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://vijaydasportfolio.netlify.app', // ✅ your live domain
      routes: [
        '/', 
        '/about', 
        '/projects', 
        '/contact'
      ],
      readable: true,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }),
  ],
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
        manualChunks: undefined,
      },
    },
  },
})
