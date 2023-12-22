import prompts from 'prompts';
import fs from 'fs';
import path from 'path';
import { getProjectEnv } from '@/utils/project/getProjectEnv';
import { getDockingFile } from '@/utils/project/docking';
import { getBaseTemplatePath } from '@/create/common/getBaseTemplatePath';

export async function getAddFeaturePrompts(targetPath: string): Promise<prompts.PromptObject<string>[]> {
  const env = getProjectEnv(targetPath);

  const docking = await getDockingFile(getBaseTemplatePath(env), 'features/');

  function isFlag(moduleName: string) {
    const moduleProp = docking.find((item: any) => item.name.includes(moduleName));
    const requiredList: string[] = moduleProp.getRequired();
    const isExist = moduleProp.isExist({ targetProjectPath: targetPath });
    let flag = true;
    requiredList.forEach((item) => {
      const moduleProp = docking.find((module: any) => module.name.includes(item));
      flag = flag && moduleProp.isExist({ targetProjectPath: targetPath });
    });
    return flag && isExist;
  }

  const createLayoutPrompt = () => {
    const choices: any = [];
    const manageIsExist = isFlag('manage');
    const homePageIsExist = isFlag('homePage');
    if (!manageIsExist) {
      choices.push({ title: '后台管理', selected: true, value: 'manage', description: '后台管理模块' });
    }
    if (!homePageIsExist) {
      choices.push({ title: '门户主页', selected: false, value: 'homePage', description: '门户主页模块 ' });
    }
    return {
      type: (prev: unknown, values: prompts.Answers<string>) => (!manageIsExist || !homePageIsExist ? 'select' : null),
      name: 'layout',
      message: '界面类型',
      choices: () => {
        return choices;
      },
    };
  };

  const creatBusinessPrompt = () => {
    const choices: any = [];
    const permissionIsExist = isFlag('permission');
    const systemManageIsExist = isFlag('systemManage');
    if (!permissionIsExist) {
      choices.push({ title: '用户权限', selected: true, value: 'permission', description: '用户权限' });
    }
    if (!systemManageIsExist) {
      choices.push({ title: '系统管理', selected: false, value: 'systemManage', description: '系统管理' });
    }
    return {
      type: (prev: unknown, values: prompts.Answers<string>) =>
        !permissionIsExist || !systemManageIsExist ? 'multiselect' : null,
      name: 'business',
      message: '业务功能',
      choices: () => {
        return choices;
      },
    };
  };

  return [
    createLayoutPrompt(),
    creatBusinessPrompt(),
    {
      type: (prev: unknown, values: prompts.Answers<string>) => (!isFlag('nprogress') ? 'multiselect' : null),
      name: 'nprogress',
      message: '路由衍生功能',
      choices: () => {
        return [
          {
            title: '页面进度条',
            selected: true,
            value: 'router-progress',
            description: '跳转页面时页面上方进度条',
          },
        ];
      },
    },
    {
      type: (prev: unknown, values: prompts.Answers<string>) => (!isFlag('mock') ? 'multiselect' : null),
      name: 'interface',
      message: '接口功能',
      choices: () => {
        return [
          {
            title: 'mock',
            selected: true,
            value: 'mock',
            description: '跳转页面时页面上方进度条',
          },
        ];
      },
    },
  ];
}
