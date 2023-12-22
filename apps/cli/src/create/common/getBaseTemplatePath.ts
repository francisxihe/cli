import { ProjectEnv } from '@/enum';
import path from 'path';

/** 根据项目环境获取对应的基座模版地址 */
export function getBaseTemplatePath(env: ProjectEnv) {
  switch (env) {
    case ProjectEnv.vue2:
      return path.resolve(__dirname, '../../repo-v2-base');
    default:
      throw new Error('项目环境不支持');
  }
}
