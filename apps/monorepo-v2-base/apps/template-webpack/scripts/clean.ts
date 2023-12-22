/**
 * clean
 * 清除打包目录
 */
import chalk from 'chalk';
import rimraf from 'rimraf';

export const clean = async (path = './packages') => {
  console.log(chalk.red('\nCleaning dist...\n'));
  await new Promise<void>((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  console.log(chalk.green('Cleaned dist.\n'));
};
