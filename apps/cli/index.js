import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import create from './lib/create.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const program = new Command();

// 增加版本信息
const version = fs.readJSONSync(join(__dirname, '/package.json')).version;
program.name('cfa').usage(`<command> [option]`).version(version);

// 增加create指令
program
  .command('init <project-name>') // 增加创建指令
  .description('create a new project') // 添加描述信息
  .option('-f, --force', 'overwrite target directory if it exists') // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入init 指令附加的参数
    create(projectName, cmd);
  });

// 监听 --help 指令
program.on('--help', function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(`Run ${chalk.cyan('cfa <command> --help')} for detailed usage of given command.`);
  console.log();
});

program.parse(process.argv);
