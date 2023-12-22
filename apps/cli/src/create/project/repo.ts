#!/usr/bin/env node

import path from 'path';

import { toValidPackageName } from '@/utils/common';
import prompts from 'prompts';
import { exec, execSync } from 'child_process';
import { createFile } from '@/utils/file/createFile';
import util from 'util';
import ora from 'ora';
import chalk from 'chalk';

const execPromise = util.promisify(exec);

async function execCommands(commands: string[], targetPath: string) {
  let index = 0;
  let spinner: any;
  try {
    for (let i = 0; i < commands.length; i++) {
      index = i;
      const command = commands[i];
      spinner = ora(`${command}中……`).start();
      const res = await execPromise(command, { cwd: targetPath });
      spinner.succeed(`${command}成功\n`);
    }
  } catch (error: any) {
    // 判断pnpm 依赖不匹配报错问题
    if (error?.stdout.includes('WARN')) {
      spinner.succeed(`${commands[index]}成功\n`);
      return;
    }
    spinner.fail(`${commands[index]}失败\n`);
    console.error(error);
  } finally {
    console.log(
      chalk.blue(`
                  ███████╗██╗             ██████╗██╗     ██╗
                  ██╔════╝██║             ██╔════╝██║     ██║
                  █████╗  ██║     █████╗  ██║     ██║     ██║
                  ██╔══╝  ██║     ╚════╝  ██║     ██║     ██║
                  ██║     ███████╗        ╚██████╗███████╗██║
                  ╚═╝     ╚══════╝         ╚═════╝╚══════╝╚═╝`),
    );
  }
}

export async function createRepo(promptsAsk: prompts.Answers<string>, { targetPath }: { targetPath: string }) {
  const { projectName, targetDir } = promptsAsk;

  const packageName = toValidPackageName(targetDir);

  // 获取模版地址和获取具体配置信息
  let sourceUrl = getRepoTemplateUrl();

  createFile(sourceUrl, targetPath, {});

  const commands = ['git init', 'pnpm install'];

  execCommands(commands, targetPath);
}

function getRepoTemplateUrl() {
  const templateRoot = path.resolve(__dirname, '../../');
  let relateUrl = 'repo-v2';
  return path.resolve(templateRoot, relateUrl);
}
