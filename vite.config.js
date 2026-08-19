/* eslint-disable import-x/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import visualizer from 'rollup-plugin-visualizer';
import path, { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: [{
        find: '@', replacement: path.resolve(__dirname, 'src'),
      }],
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        srcDir: 'src',
        strategies: 'injectManifest',
        injectRegister: null,
        filename: 'service-worker.js',
      }),
      eslintPlugin({ eslintOptions: { cache: false } }),
    ],
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    build: {
      outDir: 'build',
      assetsDir: 'static',
      sourcemap: false,
      rollupOptions: {
        plugins: [
          visualizer({
            filename: resolve(__dirname, 'analyzed.html'),
            template: 'treemap', // sunburst|treemap|network
            sourcemap: true,
          }),
        ],
      },
    },
    server: {
      // Intentionally reachable on the LAN (0.0.0.0 via VITE_DEV_HOST). Do NOT
      // widen `fs.allow` back to '..': that would let the LAN-visible dev server
      // serve the sibling backend's settings.js secrets. Vite's default keeps
      // filesystem serving scoped to the project root.
      host: process.env.VITE_DEV_HOST || 'localhost',
      port: process.env.VITE_DEV_PORT || 3000,
      open: true,
    },
  });
};
