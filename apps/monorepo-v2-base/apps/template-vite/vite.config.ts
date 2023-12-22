import { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import svgLoader from 'vite-svg-loader';
import filesize from 'rollup-plugin-filesize';
import legacy from '@vitejs/plugin-legacy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const ROOT = process.cwd();

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  console.log('isBuild', isBuild);

  const env = loadEnv(mode, ROOT);
  const { VITE_PORT, VITE_BASE_URL, VITE_BUILD_NAME } = env;
  return {
    base: VITE_BASE_URL,
    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
      legacy({
        targets: ['> 0.01%, last 10 versions, Firefox ESR'],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(ROOT, 'src/assets/icons')],
        // svgoOptions: true,
        symbolId: 'icon-[dir]-[name]',
      }),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "style/src/variables.scss";`,
        },
      },
    },

    build: {
      outDir: path.resolve(ROOT, VITE_BUILD_NAME),
      chunkSizeWarningLimit: 1024,
      // sourcemap: true,
      rollupOptions: {
        plugins: [
          filesize(),
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('rollup-plugin-visualizer').visualizer(),
        ],
        output: {
          manualChunks: {
            vue: ['vue'],
            router: ['vue-router'],
            element: ['element-ui'],
            'vite-plugin-svg-icons': ['vite-plugin-svg-icons'],
            pinia: ['pinia'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      host: '0.0.0.0',
      port: Number(VITE_PORT) || 8080,
      open: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:4523/m1/1274496-0-default/',
          changeOrigin: true,
          rewrite(path) {
            return path.replace('/api', '');
          },
        },
      },
      fs: {
        // strict: false,
        allow: ['../..'],
      },
    },
  };
};
