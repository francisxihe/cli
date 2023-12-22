import minimist from 'minimist';
import { createComponent } from '@/create/component';
import { initPrompts } from '@/utils/prompts';
import { getComponentPrompts } from '@/prompts/component';
import { AddComponentError, ComponentLevel } from '@/enum';
import { getComponentList } from '@/api';
import { log } from 'console';

export async function ininAddComponent(argv: minimist.ParsedArgs) {
  const { data: componentList } = await getComponentList();

  const promptsAsk = await initPrompts(getComponentPrompts(componentList));
  
  const componentPath = argv._[2];
  if (!componentPath) {
    throw new Error(AddComponentError.missPathAndName);
  }
  const refPath = argv._[1];
  let refLevel = ComponentLevel.page;
  if (refPath.includes('components')) {
    refLevel = ComponentLevel.component;
  }

  await createComponent(promptsAsk, {
    // TODO
    // targetPath: process.cwd(),
    targetPath: '/Users/xuwenhua/work/project',
    refPath,
    componentPath,
    refLevel,
  });
}
