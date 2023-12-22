import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import path from 'path';
import { createProxy } from './build/vite/proxy';
import { initPlugin } from './build/vite/plugin';

const ROOT = process.cwd();

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  console.log('isBuild', isBuild);

  const env = loadEnv(mode, ROOT);
  const { VITE_PORT, VITE_BASE_URL, VITE_BUILD_NAME } = env;
  return {
    base: VITE_BASE_URL,
    plugins: initPlugin(env, isBuild),
    css: {
      preprocessorOptions: {
        scss: {
        },
      },
    },

    build: {
      outDir: path.resolve(ROOT, VITE_BUILD_NAME),
      chunkSizeWarningLimit: 1024,
      // sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue'],
            'vite-plugin-svg-icons': ['vite-plugin-svg-icons'],
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
      proxy: createProxy(),
    },
  };
};
