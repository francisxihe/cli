module.exports = (api) => {
  // You can use isTest to determine what presets and plugins to use.
  const isTest = api.env('test');

  // console.log('> 当前环境是否为测试环境: ', isTest);

  const config = {
    presets: [
      [
        '@vue/cli-plugin-babel/preset',
        {
          jsx: {
            compositionAPI: true,
          },
        },
      ],
    ],
    plugins: [],
  };

  // 用于 Jest 测试 tsx 文件
  if (isTest) {
    config.presets.unshift(['@babel/preset-typescript', { isTSX: true, allExtensions: true }]); // https://babeljs.io/docs/en/babel-preset-typescript
  }

  return config;
};
