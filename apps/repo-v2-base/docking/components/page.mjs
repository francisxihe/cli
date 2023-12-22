// 初始化页面
export const getCreateConfig = (pagePath, { isLeaf, existFile }) => {
  const copyWithTempConfig = [
    {
      source: './src/components/template-page.vue',
      target: `./src/views${pagePath}/index.vue`,
    },
  ];
  const updateConfig = [];

  const pageArr = pagePath.split('/').filter(item => !!item);
  // 根页面名称
  const rootPageName = pageArr[0];
  // 当前页面名称
  const pageName = pageArr[pageArr.length - 1];
  // 父路径
  const parentPath = pageArr.slice(0, pageArr.length - 1);
  // 获取页面的router是否存在
  const routerFileExisting = existFile(`./src/router/routes/${rootPageName}.ts`);

  const fullName = pageArr.map(item => formatTitleCase(item)).join('');

  if (!routerFileExisting) {
    copyWithTempConfig.push({
      source: './src/router/routes/template-router.ts',
      target: `./src/router/routes/${rootPageName}.ts`,
      transformers: [
        sourceAST =>
          sourceAST.replace(
            `const templateRouter = { $$$ };`,
            `const ${rootPageName} = {
              path: '/${rootPageName}',
              name: '${formatTitleCase(rootPageName)}',
              component: () => ${isLeaf ? `import('@/views/${rootPageName}/index.vue')` : null},
              ${isLeaf ? '' : 'children: []'}
            };`,
          ),
        sourceAST => sourceAST.replace(`export default templateRouter;`, `export default ${rootPageName};`),
      ],
    });
  } else {
    updateConfig.push({
      source: `./src/router/routes/${rootPageName}.ts`,
      target: `./src/router/routes/${rootPageName}.ts`,
      transformers: [
        (sourceAST, targetAST) => {
          const routes = targetAST.find(`{ name: $_$0, $$$ }`);
          let flag = false;
          let currentRoute; // 全路径路由
          routes.each(item => {
            if (item.match[0][0].value === fullName) {
              flag = true;
              currentRoute = item;
            }
          });

          if (flag) {
            // 更新已存在的路由，但component为null的路由
            currentRoute.find(`name: $_$0`).each(item => {
              if (
                item.match[0][0].value === rootPageName &&
                item.next().has('component: () => null') &&
                routerFileExisting
              ) {
                item.next().replace(`component: () => null`, `component: () => import('@/views${pagePath}/index.vue')`);
              }
            });
            return targetAST;
          }

          routes.each(item => {
            if (item.match[0][0].value === parentPath.map(_item => formatTitleCase(_item))) {
              item.replace(
                'children: [$$$1],',
                `children: [$$$1, { 
                    path: '${pageName}', 
                    name: '${fullName}', 
                    component: () => ${
                      routerFileExisting ? `import('@/views${pagePath}/index.vue')` : null
                    }, children: [] 
                  }
                ],`,
              );
            }
          });

          return targetAST;
        },
      ],
    });
  }

  return {
    copyWithTempConfig,
    updateConfig,
  };
};

// // 添加表单组件
// export const createUpdateAddFormUrl = path => {
//   return {
//     source: `./src/component/templateForm/index.vue`,
//     target: `./src/view${path}/index.vue`,
//     transformers: [
//       (sourceAST, targetAST) => {
//         return targetAST;
//       },
//     ],
//   };
// };

/** 首字母大写 */
function formatTitleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
