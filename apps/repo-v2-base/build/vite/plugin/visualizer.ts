/**
 * 构建分析
 */
import visualizer from 'rollup-plugin-visualizer';

export function configVisualizerConfig() {
  //默认
  return visualizer(/*{
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  }*/) as Plugin;
}
