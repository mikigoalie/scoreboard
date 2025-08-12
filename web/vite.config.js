import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'


// https://vite.dev/config/
export default defineConfig({
  plugins: [visualizer(), react({
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
