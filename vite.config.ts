import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: '**/*.html',
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@utility': fileURLToPath(new URL('./src/utility', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
    }
  }
})
