/** 存放本地调试的子应用配置 */
export default [
  {
    name: 'template-sub-app',
    entry: '//localhost:8101/subapp/',
    container: '#sub-app-container',
    activeRule: '/subapp/template-sub-app', // 子应用的激活规则
    props: {
      source: 'template',
      container: '#sub-app-container',
    },
  },
];
