import path from 'path';
import { existsSync } from 'fs';

export function isExist({ targetProjectPath: targetPath }) {
  return existsSync(path.resolve(targetPath, './src/layout'));
}

export function getRequired() {
  return ['api', 'pinia', 'router'];
}

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];

  if (!existsSync(path.resolve(targetPath, './src/layout'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/layout/manage'),
      target: path.resolve(targetPath, './src/layout'),
    });
  }
  return {
    copyConfig,
  };
}
