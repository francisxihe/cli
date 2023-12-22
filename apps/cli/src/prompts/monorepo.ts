import prompts from 'prompts';
import { ProjectCommonConfig } from './types';

export enum EPackageType {
  app = 'app',
  module = 'module',
  linkPackage = 'linkPackage',
  package = 'package',
}

export type MonorepoConfig = ProjectCommonConfig & {
  packageType: EPackageType;
};

export const monorepoPrompts: Array<prompts.PromptObject> = [
  {
    type: (prev, values) => {
      if (values.projectType !== 'monorepo') return null;
      return 'select';
    },
    name: 'packageType',
    message: '请选择项目类型:',
    initial: 0,
    choices: [
      {
        title: 'app',
        description: '基座项目',
        value: 'app',
      },
      {
        title: 'module',
        description: '业务模块',
        value: 'module',
      },
      {
        title: 'linkPackage',
        description: '依赖app或module执行的包',
        value: 'linkPackage',
      },
      {
        title: 'package',
        description: '独立运行的包',
        value: 'package',
      },
    ],
  },
];

export type ModuleSetting = {
  frameType: 'vue@2';
};

export async function getModuleSetting() {
  return await prompts([
    {
      type: 'select',
      name: 'frameType',
      message: '请选择框架类型:',
      initial: 0,
      choices: [
        {
          title: 'vue@2',
          value: 'vue@2',
        },
      ],
    },
  ]);
}

export type LinkPackageSetting = {};

export async function getLinkPackageSetting() {
  return await prompts([]);
}
