// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  testEnvironment: 'jsdom', // 创建浏览器环境
  rootDir: path.resolve(__dirname, '../'), // 类似 webpack.context
  moduleFileExtensions: [
    // 类似 webpack.resolve.extensions
    'tsx',
    'vue',
    'ts',
    'js',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 类似 webpack.resolve.alias
  },
  testMatch: [
    // 只会跑在 test 文件里的测试用例
    '<rootDir>/test/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  transform: {
    // 类似 webpack.module.rules
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue2-jest',
    '\\.(less|css)$': 'jest-less-loader',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/test/setup'], // 类似 webpack.entry

  // 这里为输出结果信息配置，影响测试速度
  // 需要时开启
  // coverageDirectory: '<rootDir>/test/coverage', // 类似 webpack.output
  // collectCoverageFrom: [ // 类似 webpack 的 rule.include
  //   'src/**/*.{js,vue}',
  //   '!src/main.js', // '!' 表示不包含
  //   '!src/router/index.js',
  //   '!**/node_modules/**',
  // ],
};
