import { execSync } from 'child_process';
import { createFeatureWithTemplate } from './withTmpl';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import { getProjectEnv } from '@/utils/project/getProjectEnv';

export async function createFeature(promptsAsk: prompts.Answers<string>, { targetPath }: { targetPath: string }) {
  if (!Object.keys(promptsAsk).length) {
    console.log(chalk.blue('暂无功能添加\n'));
    return;
  }
  let _devDependencies: string[] = [];
  let _dependencies: string[] = [];
  function addDependencies({ devDependencies, dependencies }: { devDependencies?: string[]; dependencies?: string[] }) {
    if (devDependencies) {
      _devDependencies = [..._devDependencies, ...devDependencies];
    }
    if (dependencies) {
      _dependencies = [..._dependencies, ...dependencies];
    }
  }

  console.log('\n');
  const spinner = ora('功能添加中……').start();
  try {
    if (promptsAsk.initial?.includes('pinia')) {
      await createFeatureWithTemplate(targetPath, 'pinia', { addDependencies });
    }
    if (promptsAsk.initial?.includes('element-ui')) {
      await createFeatureWithTemplate(targetPath, 'element-ui', { addDependencies });
    }
    if (promptsAsk.initial?.includes('api')) {
      await createFeatureWithTemplate(targetPath, 'api', { addDependencies });
    }

    if (promptsAsk.initial?.includes('router')) {
      await createFeatureWithTemplate(targetPath, 'router', { addDependencies });
    }

    if (promptsAsk.initial?.includes('router') && promptsAsk.nprogress?.includes('router-progress')) {
      await createFeatureWithTemplate(targetPath, 'nprogress', { addDependencies });
    }

    if (promptsAsk.layout?.includes('manage')) {
      await createFeatureWithTemplate(targetPath, 'manage', { addDependencies });
    }

    if (promptsAsk.layout?.includes('homePage')) {
      await createFeatureWithTemplate(targetPath, 'homePage', { addDependencies });
    }

    if (promptsAsk.initial?.includes('lodash')) {
      addDependencies({
        devDependencies: ['lodash@latest', '@types/lodash@latest'],
      });
    }

    if (promptsAsk.initial?.includes('windicss')) {
      await createFeatureWithTemplate(targetPath, 'windicss', { addDependencies });
    }

    if (promptsAsk.initial?.includes('vueuse')) {
      addDependencies({
        devDependencies: ['@vueuse/core@5'],
      });
    }

    if (promptsAsk.business?.includes('permission')) {
      await createFeatureWithTemplate(targetPath, 'permission', { addDependencies });
    }

    if (promptsAsk.business?.includes('systemManage')) {
      await createFeatureWithTemplate(targetPath, 'systemManage', { addDependencies });

      if (!promptsAsk.business?.includes('permission')) {
        console.log(chalk.yellow('使用系统管理模块，需要用户权限模块，已为您默认添加'));
        await createFeatureWithTemplate(targetPath, 'permission', { addDependencies });
      }
    }

    if (promptsAsk.interface?.includes('mock')) {
      await createFeatureWithTemplate(targetPath, 'mock', { addDependencies });
    }

    if (_devDependencies.length) {
      const cmd = `pnpm add ${_devDependencies.join(' ')} -D`;
      execSync(cmd, { cwd: targetPath });
    }
    spinner.succeed('功能添加成功');
  } catch (e) {
    spinner.fail(chalk.red('功能添加失败'));
    console.log(e);
  }
}
