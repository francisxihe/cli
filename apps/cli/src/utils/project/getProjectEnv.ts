import { ProjectEnv } from '@/enum';
import { getProjectPackageJson } from '../common';
import { minVersion } from 'semver';

/** 获取指定目录项目环境
 * 判断依据，当前目录下的package.json文件
 */
export function getProjectEnv(targetPath: string) {
  const packageJson = getProjectPackageJson(targetPath);
  let env: ProjectEnv | undefined;
  if (packageJson.devDependencies.vue) {
    const semverObj = minVersion(packageJson.devDependencies.vue);
    if (semverObj) {
      if (semverObj.major === 2 && semverObj.minor === 7) env = ProjectEnv.vue2;
      if (semverObj.major === 3) env = ProjectEnv.vue3;
    }
  }
  if (env === undefined) {
    throw new Error('项目环境不支持');
  }
  return env;
}
