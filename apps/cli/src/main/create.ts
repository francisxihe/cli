import minimist from 'minimist';
import { createProject } from '@/create/project';
import { getPromptsAsk } from '@/prompts';
import { createFeature } from '@/create/feature';
import { getTargetPath } from '@/utils/common';

export async function initCreateProject(argv: minimist.ParsedArgs) {
  const promptsAsk = await getPromptsAsk({
    targetDir: argv._[1],
    forceOverwrite: argv.force,
  });

  const { projectName, targetDir } = promptsAsk;
  const targetPath = getTargetPath(targetDir, projectName);

  await createProject(promptsAsk, { targetPath });

  await createFeature(promptsAsk, { targetPath });
}
