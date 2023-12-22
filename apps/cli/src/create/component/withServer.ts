import { createFile } from '@/utils/file/createFile';
import { updateFile } from '@/utils/file/updateFile';
import path from 'path';
import { existsSync } from 'fs';
import { getDockingFile } from '@/utils/project/docking';
import { getBaseTemplatePath } from '../common/getBaseTemplatePath';
import { getProjectEnv } from '@/utils/project/getProjectEnv';
import { createFileWithCode } from '@/utils/file/createFileWithCode';
import { updateFileWithCode } from '@/utils/file/updateFilWithCode';
import { normalizeComponentPath } from '@/utils/common';
import { transformVue2 } from './vue2';
import { getComponentDetail } from '@/api';

const fileType = 'vue2';

/** 创建子组件 */
export async function createComponentWithServer(
  /** 目标项目地址 */
  targetProjectPath: string,
  config: {
    /** 引用组件的文件地址  */
    refPath?: string;
    /** 引用组件的类型  */
    refLevel: 'component' | 'page' | 'router';
    /** 组件相对地址  */
    componentPath: string;
    /** 组件类型 */
    componentId: string;
  },
) {
  const { refPath, componentPath, componentId, refLevel } = config;

  // 创建新页面
  if (refLevel === 'router') {
    await createPage(targetProjectPath, {
      componentPath,
    });
    return;
  }
  if (!refPath) {
    throw new Error('引用组件地址不存在');
  }
  // 页面中创建组件
  if (refLevel === 'page' || refLevel === 'component') {
    await createComponent(targetProjectPath, {
      refPath,
      componentPath,
      refLevel,
      componentId,
    });
  }
}

export async function createPage(
  /** 目标项目地址 */
  targetProjectPath: string,
  config: {
    /** 组件相对地址  */
    componentPath: string;
  },
) {
  const { componentPath: pagePath } = config;

  // 获取项目环境
  const env = getProjectEnv(targetProjectPath);
  const templatePath = getBaseTemplatePath(env);
  const { getCreateConfig } = await getDockingFile(templatePath, `components/page`);
  const pageArr = pagePath.split('/').filter((item) => !!item);

  // 生成页面和配置对应的路由
  pageArr.reduce((parentPath, pageName, index) => {
    const pagePath = `${parentPath}/${pageName}`;
    const { copyWithTempConfig, updateConfig } = getCreateConfig(pagePath, {
      isLeaf: index === pageArr.length - 1,
      existFile: (filePath: string) => {
        return existsSync(path.resolve(targetProjectPath, filePath));
      },
    });

    copyWithTempConfig.forEach((item: any) => {
      createFile(path.resolve(templatePath, item.source), path.resolve(targetProjectPath, item.target), item);
    });
    updateConfig.forEach((item: any) => {
      updateFile(path.resolve(targetProjectPath, item.source), path.resolve(targetProjectPath, item.target), item);
    });

    return pagePath;
  }, '');
}

export async function createComponent(
  /** 目标项目地址 */
  targetProjectPath: string,
  config: {
    /** 组件引用地址  */
    refPath: string;
    /** 组件相对引用路径的地址  */
    componentPath: string;
    /** 引用层级  */
    refLevel: string;
    /** 组件类型  */
    componentId: string;
  },
) {
  let { componentPath, refPath, refLevel, componentId } = config;

  // 获取项目环境
  const env = getProjectEnv(targetProjectPath);

  const { data } = await getComponentDetail(componentId as unknown as number);

  const { code, ref_code, repo_env } = data;

  Object.keys(JSON.parse(code)).forEach((filePath) => {
    createFileWithCode(
      JSON.parse(code)[filePath].code,
      path.resolve(targetProjectPath, 'src/views', refPath, filePath),
      {},
    );
  });

  Object.keys(JSON.parse(ref_code)).forEach((filePath) => {
    updateFileWithCode(
      JSON.parse(ref_code)[filePath].code,
      normalizeComponentPath(path.resolve(targetProjectPath, 'src/views'), refPath),
      {
        fileType: repo_env,
        transformers: [transformVue2],
      },
    );
  });
}
