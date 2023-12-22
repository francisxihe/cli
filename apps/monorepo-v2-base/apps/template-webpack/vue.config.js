const path = require('path');

module.exports = {
  publicPath: '/subapp/',
  outputDir: 'subapp',

  devServer: {
    // 监听端口
    port: 8139,
    // 关闭主机检查，使微应用可以被 fetch
    // disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/subapp/credit-supervision': {
        target: 'http://172.16.21.147:8098/', //线上后台
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      fallback: {
        os: require.resolve('os-browserify/browser'),
      },
    },
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      library: 'template-sub-app',
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd',
      // 按需加载相关，设置为 webpackJsonp_微应用名称 即可
      // jsonpFunction: `webpackJsonp_${APP_NAME}`,
    },
  },
  css: {
    loaderOptions: {
      // 不同 sass-loader 版本对应关键字， v8-: data   v8: prependData   v10+: additionalData
      sass: {
        additionalData: `@import "style/src/variables.scss";`,
      },
      scss: {
        additionalData: `@import "style/src/variables.scss";`,
      },
    },
  },
};
