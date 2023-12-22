import { createMonorepo } from './monorepo';
import { createRepo } from './repo';
import { forceOverwriteTarget } from './common';
import { EProjectType } from '@/prompts/types';
import prompts from 'prompts';

export async function createProject(promptsAsk: prompts.Answers<string>, { targetPath }: { targetPath: string }) {
  forceOverwriteTarget(promptsAsk, targetPath);

  switch (promptsAsk.projectType) {
    case EProjectType.monorepo:
      await createMonorepo(promptsAsk, { targetPath });
      break;
    case EProjectType.repo:
      await createRepo(promptsAsk, { targetPath });
      break;
    case EProjectType.tsc:
      // await createTsc(argv, promptsAsk);
      break;
  }
}
