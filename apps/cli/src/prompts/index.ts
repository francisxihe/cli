import prompts from 'prompts';
import { extractProjectName, getTargetPath } from '../utils/common';
import { monorepoPrompts } from './monorepo';
import { repoPrompts } from './repo';
import { ProjectCommonConfig } from './types';
import { isEmptyDirectory } from '@/utils/directory';

/** 获取用户配置 */
export async function getPromptsAsk(
  params: Partial<ProjectCommonConfig> & {
    targetDir: string;
    forceOverwrite: boolean;
  },
) {
  const { targetDir } = params;

  try {
    return prompts(
      [
        {
          type: 'text',
          name: 'targetDir',
          message: '请输入生成地址:',
          initial: targetDir || './',
        },
        {
          type: 'select',
          name: 'projectType',
          message: '请选择工程类型:',
          initial: 0,
          choices: [
            {
              title: 'repo',
              description: '单项目工程',
              value: 'repo',
            },
            {
              title: 'monorepo',
              description: '多项目工程',
              value: 'monorepo',
            },
          ],
        },
        {
          name: 'projectName',
          type: () => {
            return targetDir && extractProjectName(targetDir) ? null : 'text';
          },
          message: '项目名称:',
          initial: () => {
            return 'project';
          },
        },
        {
          name: 'forceOverwrite',
          type: (pre, values) => {
            return isEmptyDirectory(getTargetPath(targetDir, values.projectName)) || params.forceOverwrite
              ? null
              : 'confirm';
          },
          message: (pre, values) => {
            const dirForPrompt =
              getTargetPath(targetDir, values.projectName) === '.'
                ? 'Current directory'
                : `Target directory "${getTargetPath(targetDir, values.projectName)}"`;
            return `${dirForPrompt} 不是空目录，是否清空后目录后创建新项目`;
          },
        },
        ...monorepoPrompts,
        ...repoPrompts,
      ],
      {
        onCancel: () => {
          throw new Error('用户取消');
        },
      },
    );
  } catch (e: any) {
    console.log(e.message);
    process.exit(1);
  }
}
