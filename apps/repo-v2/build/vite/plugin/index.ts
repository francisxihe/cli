import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import svgLoader from 'vite-svg-loader';
import legacy from '@vitejs/plugin-legacy';
import filesize from 'rollup-plugin-filesize';
import { configSvgIconsPlugin } from './svgSprite';
import { configVisualizerConfig } from './visualizer';

export const initPlugin = (env: any, isBuild: boolean) => {
  const { VITE_PORT, VITE_BASE_URL, VITE_BUILD_NAME } = env;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // 必须
    vue(),
    // 必须
    vueJsx(), // support name
  ];

  vitePlugins.push(svgLoader());

  // @vitejs/plugin-legacy
  isBuild &&
    vitePlugins.push(
      legacy({
        targets: ['> 0.01%, last 10 versions, Firefox ESR'],
      }),
    );

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // rollup-plugin-filesize
  vitePlugins.push(filesize() as unknown as PluginOption);

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  return vitePlugins;
};
