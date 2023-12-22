import { AddPageError, ProjectEnv } from '@/enum';
import { createFile } from '@/utils/file/createFile';
import { updateFile } from '@/utils/file/updateFile';
import path from 'path';
import { existsSync } from 'fs';
import { AddComponentError } from '@/enum';
import { getDockingFile } from '@/utils/project/docking';
import { getBaseTemplatePath } from '../common/getBaseTemplatePath';
import { getProjectEnv } from '@/utils/project/getProjectEnv';

/** 创建子组件 */
export async function createComponentWithTemplate(
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
    componentType: string;
  },
) {
  const { refPath, componentPath, componentType, refLevel } = config;

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
      componentType,
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
    componentType: string;
  },
) {
  let { componentPath, refPath, refLevel, componentType } = config;

  // 获取项目环境
  const env = getProjectEnv(targetProjectPath);
  const templateProjectPath = getBaseTemplatePath(env);
  const { getCreateConfig } = await getDockingFile(templateProjectPath, `components/${componentType}`);
  const { copyConfig, updateConfig } = getCreateConfig(
    componentType,
    {
      templateProjectPath,
      targetProjectPath,
      refPath,
      componentPath,
      refLevel,
    },
  );

  copyConfig.forEach((item: any) => {
    createFile(item.source, item.target, item);
  });

  updateConfig.forEach((item: any) => {
    updateFile(item.source, item.target, item);
  });
}
