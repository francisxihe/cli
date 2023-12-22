import minimist from 'minimist';
import { CommandType } from '@/enum';
import chalk from 'chalk';
import { initCreateProject } from './create';
import { initAddPage } from './addPage';
import { ininAddComponent } from './addComponent';
import { initAddFeatrue } from './addFeature';

export async function init() {
  console.log(chalk.bold.blue(`\nstart\n`));

  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ['ts'],
      'with-tests': ['tests'],
      router: ['vue-router'],
    },
    // all arguments are treated as booleans
    boolean: true,
  });

  switch (argv._[0]) {
    case CommandType.create:
      await initCreateProject(argv);
      break;
    case CommandType.addPage:
      await initAddPage(argv);
      break;
    case CommandType.addComponent:
      await ininAddComponent(argv);
      break;
    case CommandType.addFeature:
      await initAddFeatrue();
      break;
  }
}
