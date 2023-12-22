import { defineConfig, Plugin, loadEnv, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import svgLoader from 'vite-svg-loader';
import legacy from '@vitejs/plugin-legacy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import mkcert from 'vite-plugin-mkcert';
// import babel from 'vite-plugin-babel';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';
import { setupName } from './build/setupName';
import chunkSplit from './build/chunkSplit';
import chunkFileNames from './build/chunkFileNames';

const ROOT = process.cwd();

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';
  console.log('isBuild', isBuild);

  const env = loadEnv(mode, ROOT);
  const { VITE_PORT, VITE_BASE_URL, VITE_BUILD_NAME } = env;
  return {
    // root: resolve(ROOT, '../..'),
    base: VITE_BASE_URL,

    plugins: [
      vue(),
      setupName(),
      // babel({
      // }),
      vueJsx(),
      // TLS证书
      // mkcert({ source: 'coding' }),
      eslintPlugin({
        cache: false,
        fix: true,
        include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.vue'],
        exclude: ['**/node_modules/**', '**/creditUnionPage/**'],
      }),
      svgLoader(),
      // legacy({
      //   targets: ['> 0.01%, last 10 versions, Firefox ESR'],
      // }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(ROOT, 'src/assets/icons')],
        // svgoOptions: true,
        symbolId: 'icon-[dir]-[name]',
      }),
      // VitePluginProxyMiddleware({
      //   proxyTable: path.resolve(__dirname, './proxy-table'),
      // }),
      chunkSplit,
      splitVendorChunkPlugin(),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "style/src/variables.scss";`,
        },
      },
    },

    build: {
      cssCodeSplit: false,
      outDir: path.resolve(ROOT, VITE_BUILD_NAME),
      chunkSizeWarningLimit: 1024,

      emptyOutDir: true,
      // sourcemap: true,
      rollupOptions: {
        plugins: [
          // 这两个插件完全兼容vite
          // filesize(),
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          // require('rollup-plugin-visualizer').visualizer(),
        ],
        output: {
          chunkFileNames,
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },

    resolve: {
      alias: {
        '@/': resolve(process.cwd(), '.', 'src') + '/',
      },
    },
    server: {
      // https: true,
      host: '0.0.0.0',
      port: Number(VITE_PORT) || 8080,
      open: true,
      fs: {
        allow: ['../..'],
        // 将 public 目录和 node_modules 目录加入到 allowlist 数组中
        // allow: ['node_modules'],
      },
      proxy: {},
      // 依赖预构建
      optimizeDeps: {
        entries: ['**/*.vue', '**/*.ts'],
        include: ['element-ui', 'vue', 'pinia', 'echarts'],
      },
    },
  };
});
