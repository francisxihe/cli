import fs from 'fs-extra';
import minimist from 'minimist';
import { execa } from 'execa';
import { resolve } from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { clean } from './clean';

// const defaultPkgs = fs.readdirSync('packages').filter(pkg =>
//     !fs.readJsonSync(`packages/${pkg}/package.json`).private
// );

const args = minimist(process.argv.slice(2));
// 从 args 中获取打包参数
// const customPkgs = args.dist ? args.dist.split(',') : defaultPkgs;

// const CPU_COUNT = require('os').cpus().length;

const run = async () => {
  // stdio: 'inherit' 子进程将使用父进程的标准输入输出
  await clean();

  await execa(
    'rollup',
    ['-c', 'build/rollup.config.js'],
    // [
    //     '-c',
    //     '--environment',
    //     [
    //         `NODE_ENV:production`,
    //         `CPU_COUNT:${CPU_COUNT}`,
    //         `${customPkgs.join('|')}`,
    //     ].join(','),
    // ],
    // { stdio: 'inherit' }
  );
  await execa('git', ['add', '.']);
  await execa('git', ['commit', '-n', '-m', '"feat: demo完善"']);
  await execa('npm', ['version', 'patch']);
  await execa('npm', ['publish']);
  await execa('git', ['push']);
};

const setup = async () => {
  try {
    await run();
  } catch (e) {
    console.log(chalk.red(e));
    process.exit(1);
  }
};

setup();
