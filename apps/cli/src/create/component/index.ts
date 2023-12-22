import prompts from 'prompts';
import { createComponentWithTemplate } from './withTmpl';
import chalk from 'chalk';
import ora from 'ora';
import { AddComponentError, ComponentLevel } from '@/enum';
import { createComponentWithServer } from './withServer';

export async function createComponent(
  promptsAsk: prompts.Answers<string>,
  {
    targetPath,
    refPath,
    componentPath,
    refLevel,
  }: {
    /** 项目地址 */
    targetPath: string;
    /** 引用组件的文件地址  */
    refPath?: string;
    /** 引用组件的类型  */
    refLevel: ComponentLevel;
    /** 组件相对地址  */
    componentPath: string;
  },
) {
  console.log('\n');
  const spinner = ora('组件创建中……').start();
  try {
    if (!promptsAsk.componentId) {
      return;
    }

    // await createComponentWithTemplate(targetPath, {
    //   refPath,
    //   componentPath,
    //   componentType: promptsAsk.componentType,
    //   refLevel,
    // });

    await createComponentWithServer(targetPath, {
      refPath,
      componentPath,
      componentId: promptsAsk.componentId,
      refLevel,
    });

    // if (promptsAsk.modalComponent?.includes('form')) {
    //   await createRefComponent(targetPath, {
    //     refPath,
    //     componentPath,
    //     addComponentName: 'form',
    //     featureName: 'modalComponent',
    //   });
    // }

    // if (promptsAsk.modalComponent?.includes('cancel')) {
    //   await createRefComponent(targetPath, {
    //     refPath,
    //     componentPath,
    //     addComponentName: 'cancel',
    //     featureName: 'modalComponent',
    //   });
    // }

    // if (promptsAsk.modalComponent?.includes('confirm')) {
    //   await createRefComponent(targetPath, {
    //     refPath,
    //     componentPath,
    //     addComponentName: 'confirm',
    //     featureName: 'modalComponent',
    //   });
    // }

    // if (promptsAsk.list?.includes('form')) {
    //   await createRefComponent(targetPath, {
    //     refPath,
    //     componentPath,
    //     addComponentName: 'listForm',
    //     featureName: 'modalComponent',
    //   });
    // }

    // if (promptsAsk.list?.includes('table')) {
    //   await createRefComponent(targetPath, {
    //     refPath,
    //     componentPath,
    //     addComponentName: 'listTable',
    //     featureName: 'modalComponent',
    //   });
    // }

    // if (promptsAsk.list?.includes('pagination')) {
    //   await createRefComponent(targetPath, {
    //     refPath,
    //     componentPath,
    //     addComponentName: 'listPagination',
    //     featureName: 'modalComponent',
    //   });
    // }

    spinner.succeed('组件创建成功');
  } catch (e) {
    spinner.fail(chalk.red('组件创建失败'));
    console.log(e);
  } finally {
    spinner.clear();
  }
}
