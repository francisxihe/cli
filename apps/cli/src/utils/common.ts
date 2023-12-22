import { log } from 'console';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

/** 从路径中解析出项目名称  */
export function extractProjectName(path: string) {
  const result = path.match(/[^/]*$/);
  return result ? result[0] : null;
}

export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-');
}

export function getTargetPath(targetDir: string, projectName: string) {
  if (extractProjectName(targetDir)) {
    return path.join(cwd(), targetDir);
  }
  return path.join(cwd(), targetDir + projectName);
}

export function getProjectPackageJson(projectPath: string) {
  return JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'));
}

/** 判断当前操作系统环境 */
export function isWindows() {
  return process.platform === 'win32';
}

/** 根据组件的引用路径和其相对引用路径的地址，获取组件的绝对地址 */
export function normalizeComponentPath(rootPath: string, componentPath: string) {
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
