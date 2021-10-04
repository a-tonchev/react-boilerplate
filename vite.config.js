/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { VitePWA } from 'vite-plugin-pwa';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import visualizer from 'rollup-plugin-visualizer';
import path, { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{
      find: '@', replacement: path.resolve(__dirname, 'src'),
    }],
  },
  plugins: [
    reactRefresh(),
    VitePWA({
      strategies: 'injectManifest',
      injectRegister: null,
      filename: 'service-worker.js',
    }),
    eslintPlugin(),
  ],
  build: {
    outDir: 'build',
    assetsDir: 'static',
    sourcemap: true,
    rollupOptions: {
      plugins: [
        visualizer({
          filename: resolve(__dirname, 'analyzed.html'),
          template: 'treemap', // sunburst|treemap|network
          sourcemap: true,
        }),
      ],
      output: {
        manualChunks: {
          // comment out fabric, and it will not be loaded again
          fabric: ['fabric'],
        },
      },
    },
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: [
        '..',
      ],
    },
  },
});
