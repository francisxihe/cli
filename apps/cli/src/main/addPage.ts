import minimist from 'minimist';
import { initPrompts } from '@/utils/prompts';
import { getComponentPrompts } from '@/prompts/component';
import { createComponent } from '@/create/component';
import { ComponentLevel } from '@/enum';

export async function initAddPage(argv: minimist.ParsedArgs) {
  const promptsAsk = await initPrompts(getComponentPrompts());
  
  await createComponent(promptsAsk, {
    // TODO
    // targetPath: process.cwd(),
    targetPath: '/Users/xuwenhua/work/project',
    componentPath: argv._[1],
    refLevel: ComponentLevel.router,
  });
}
