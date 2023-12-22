import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import mkdirp from 'mkdirp';
import { emptyDir } from 'fs-extra';

export function forceOverwriteTarget(promptsAsk: prompts.Answers<string>, targetPath: string) {
  const { forceOverwrite } = promptsAsk;

  if (fs.existsSync(targetPath)) {
    if (forceOverwrite) emptyDir(targetPath);
  } else {
    mkdirp.sync(targetPath);
  }

  console.log(`\n搭建项目于${targetPath}...\n`);
}
