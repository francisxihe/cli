#!/usr/bin/env node

import fs from 'fs';
import { mkdirp } from 'mkdirp';
import { getTargetPath, toValidPackageName } from '@/utils/common';
import { createFile } from '@/utils/file/createFile';
import prompts from 'prompts';
import path from 'path';
import { exec, execSync } from 'child_process';
import util from 'util';
import ora from 'ora';
import chalk from 'chalk';

import { emptyDir } from '@/utils/directory';

const execPromise = util.promisify(exec);

async function execCommands(commands: string[], targetPath: string) {
  let index = 0;
  let spinner: any;
  try {
    for (let i = 0; i < commands.length; i++) {
      index = i;
      const command = commands[i];
      spinner = ora(command).start();
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

export async function createMonorepo(promptsAsk: prompts.Answers<string>, { targetPath }: { targetPath: string }) {
  const { projectName, targetDir, forceOverwrite, packageType } = promptsAsk;

  const cwd = process.cwd();

  const packageName = toValidPackageName(targetDir);

  // 获取模版地址和获取具体配置信息
  let templateUrl = getMonorepoUrl();

  // todo判断
  const root = getTargetPath(targetDir, projectName);

  if (fs.existsSync(root)) {
    if (forceOverwrite) emptyDir(root);
  } else {
    mkdirp.sync(root);
  }

  console.log(`\n搭建项目于${root}...\n`);

  createFile(templateUrl, root, {});

  const commands = ['pnpm install'];

  execCommands(commands, targetPath);
}

export enum EPackageType {
  app = 'app',
  module = 'module',
  linkPackage = 'linkPackage',
  package = 'package',
}

function getMonorepoUrl(packageType?: EPackageType) {
  const templateRoot = path.resolve(__dirname, '../../');
  let relateUrl = 'monorepo';
  switch (packageType) {
    case EPackageType.module:
    // relateUrl = 'monorepo/module';
    // break;
    case EPackageType.linkPackage:
    // relateUrl = 'monorepo/linkPackage';
    // break;
    case EPackageType.package:
    // relateUrl = 'monorepo/package';
    // break;
    case EPackageType.app:
    default:
  }
  return path.resolve(templateRoot, relateUrl);
}
