import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      dts: false,
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    Components({
      dts: false,
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/dashboard/',
  server: {
    proxy: {
      '/dashboard/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
