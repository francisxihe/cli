import { ProjectEnv } from '@/enum';
import { createFile } from '@/utils/file/createFile';
import { FileRule } from '@/utils/file/rule';
import { updateFile } from '@/utils/file/updateFile';
import { execSync } from 'child_process';
import path from 'path';
import { getDockingFile } from '@/utils/project/docking';
import { getBaseTemplatePath } from '../common/getBaseTemplatePath';
import { getProjectEnv } from '@/utils/project/getProjectEnv';

export async function createFeatureWithTemplate(
  targetProjectPath: string,
  featureName: string,
  {
    addDependencies,
  }: {
    addDependencies: ({
      devDependencies,
      dependencies,
    }: {
      devDependencies?: string[];
      dependencies?: string[];
    }) => void;
  },
) {
  const env = getProjectEnv(targetProjectPath);
  const templateProjectPath = getBaseTemplatePath(env);

  const { getCreateConfig } = await getDockingFile(templateProjectPath, `features/${featureName}`);

  const { copyConfig, updateConfig, CMD, devDependencies, dependencies } = getCreateConfig({
    templateProjectPath,
    targetProjectPath,
  });

  copyConfig.forEach((item: any) => {
    createFile(item.source, item.target, item);
  });

  updateConfig &&
    updateConfig.forEach((item: any) => {
      updateFile(item.source, item.target, item);
    });

  if (CMD) {
    execSync(CMD, { cwd: targetProjectPath, stdio: 'inherit' });
  }

  addDependencies({ devDependencies, dependencies });
}
