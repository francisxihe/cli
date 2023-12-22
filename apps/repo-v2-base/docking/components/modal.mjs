import path from 'path';
import { getComponentPathByRelPath } from '../common/getComponentPathByRelPath.mjs';

export function getCreateConfig(
  componentType,
  { templateProjectPath: templatePath, targetProjectPath: targetPath, refPath, componentPath, refLevel },
) {
  const componentArr = componentPath.split('/').filter(item => !!item);

  // 当前组件名称
  const componentName = componentArr[componentArr.length - 1];
  // 如果引用组件为页面，则组件文件放在components目录下
  if (refLevel === 'page') {
    componentPath = `components/${componentPath}`;
  }
  const copyConfig = [
    {
      source: path.resolve(templatePath, './src/components', `${componentType}.vue`),
      target: path.resolve(targetPath, './src/views', refPath, `${componentPath}.vue`),
    },
  ];

  // 更新路由
  const updateConfig = [
    {
      source: getComponentPathByRelPath(path.resolve(targetPath, './src/views'), refPath),
      target: getComponentPathByRelPath(path.resolve(targetPath, './src/views'), refPath),
      fileType: 'vue2',
      transformers: [
        (sourceAST, targetAST) => {
          const templateAST = targetAST.find(`<template></template>`);
          if (templateAST.find(`<${componentName} $$$0>$$$1</${componentName}>`).generate()) {
            return targetAST;
          }
          templateAST.replace(`<div $$$>$_$</div>`, `<div $$$>$_$<${componentName}></${componentName}>\n</div>`);
          return targetAST;
        },
        // 更新script，未实现
        (sourceAST, targetAST) => {
          const scriptAST = targetAST.find(`<script $$$ setup></script>`);
          if (scriptAST.find(`import $$$ from './components/${componentName}.vue'`).generate()) {
            return targetAST;
          }
          scriptAST.before(`import ${componentName} from './components/${componentName}.vue'`);
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
