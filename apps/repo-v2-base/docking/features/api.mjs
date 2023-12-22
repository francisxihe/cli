import { existsSync } from 'fs';
import path from 'path';

export function isExist({ targetProjectPath: targetPath }) {
  return (
    existsSync(path.resolve(targetPath, './src/api/common.ts')) &&
    existsSync(path.resolve(targetPath, './src/plugins/request'))
  );
}

export function getRequired() {
  return ['pinia', 'router'];
}

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];
  const updateConfig = [];

  if (!existsSync(path.resolve(targetPath, './src/api/common.ts'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/api/common.ts'),
      target: path.resolve(targetPath, './src/api/common.ts'),
    });
  }

  if (!existsSync(path.resolve(targetPath, './src/plugins/request'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/plugins/request'),
      target: path.resolve(targetPath, './src/plugins/request'),
    });
  }

  return {
    copyConfig,
    updateConfig,
    devDependencies: ['qs@^6', '@fl/http@0'],
  };
}
