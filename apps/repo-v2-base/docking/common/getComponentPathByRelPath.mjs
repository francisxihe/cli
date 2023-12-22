import fs from 'fs';
import path from 'path';

/** 根据组件的引用路径和其相对引用路径的地址，获取组件的绝对地址 */
export function getComponentPathByRelPath(rootPath, componentPath) {
  let fullPath;
  if (fs.existsSync(path.resolve(rootPath, `${componentPath}.vue`))) {
    fullPath = path.resolve(rootPath, `${componentPath}.vue`);
  } else if (fs.existsSync(path.resolve(rootPath, `${componentPath}.tsx`))) {
    fullPath = path.resolve(rootPath, `${componentPath}.tsx`);
  } else if (fs.existsSync(path.resolve(rootPath, componentPath, 'index.vue'))) {
    fullPath = path.resolve(rootPath, componentPath, 'index.vue');
  } else if (fs.existsSync(path.resolve(rootPath, componentPath, 'index.tsx'))) {
    fullPath = path.resolve(rootPath, componentPath, 'index.tsx');
  }

  if (fullPath) {
    return fullPath;
  }
  throw new Error('componentPath无对应组件');
}
