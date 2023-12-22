import path from 'path';
import { getComponentPathByRelPath } from '../common/getComponentPathByRelPath.mjs';

export function getCreateConfig(
  componentType,
  { templateProjectPath: templatePath, targetProjectPath: targetPath, refPath, componentPath, refLevel },
) {
  const copyConfig = [];

  // 更新路由
  const updateConfig = [
    {
      source: path.resolve(templatePath, './src/components', `${componentType}.vue`),
      target: getComponentPathByRelPath(path.resolve(targetPath, './src/views'), refPath),
      fileType: 'vue2',
      transformers: [
        (sourceAST, targetAST) => {
          const insertDom = sourceAST.find(`<template></template>`).generate();
          const insertJS = sourceAST.find(`<script $$$ setup></script>`).generate();

          targetAST
            .find(`<template></template>`)
            .replace(`<div class="footer$_$" $$$1>$$$2</div>`, (match, node) => {
              return `<div class="${match.footer[0].value}" $$$1>$$$2${insertDom}</div>`;
            })
            .root()
            .find(`<script $$$ setup></script>`)
            .after(insertJS);

          return targetAST;
        },
      ],
    },
  ];

  return {
    copyConfig,
    updateConfig,
  };
}
