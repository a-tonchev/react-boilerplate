/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import eslintPlugin from '@nabla/vite-plugin-eslint';
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
      sourcemap: true,
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
      host: process.env.VITE_DEV_HOST || 'localhost',
      port: process.env.VITE_DEV_PORT || 3000,
      open: true,
      fs: {
        // Allow serving files from one level up to the project root
        allow: [
          '..',
        ],
      },
    },
    esbuild: {
      // jsxFactory: 'jsx',
      // jsxInject: 'import { jsx } from \'@emotion/react\'',
    },
  });
};
