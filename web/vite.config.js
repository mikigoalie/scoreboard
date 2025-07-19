import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [['babel-plugin-react-compiler', { target: '19' }]],
    },
  }),],
  base: './',
  publicDir: false,
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '~/': '/src/',
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs'
    }
  }
})
