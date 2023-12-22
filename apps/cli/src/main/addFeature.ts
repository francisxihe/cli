import { createFeature } from '@/create/feature';
import { initPrompts } from '@/utils/prompts';
import { getAddFeaturePrompts } from '@/prompts/addFeature';

export async function initAddFeatrue() {
  //   const targetPath = '/Users/xuwenhua/work/project';

  // TODO
  const targetPath = process.cwd();
  const promptsAsk = await initPrompts(await getAddFeaturePrompts(targetPath));

  await createFeature(promptsAsk, {
    targetPath,
  });
}
