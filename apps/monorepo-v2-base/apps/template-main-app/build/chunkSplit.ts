import path from 'path';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = require(pkgPath);

const dep = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
};

const customSplitting = {
  // vue: ['vue', 'vue-router', 'pinia'],
  // element: ['element-ui'],
  'vite-plugin-svg-icons': ['vite-plugin-svg-icons'],
};

export default chunkSplitPlugin({
  strategy: 'all-in-one',
  // customChunk: (args) => {
  //   let { file } = args;
  //   // const regex = /\.\.\/\.\.\/(\w+\/\w+)(\/.*)?/; // 匹配 ../../ 后面的模块名
  //   // const replacement = '$1'; // 将匹配到的模块名用 $1 表示，用于替换
  //   // file = file.replace(regex, replacement);

  //   return file;
  // },
  // customSplitting,
});
