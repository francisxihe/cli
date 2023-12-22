import { existsSync } from 'fs';
import path from 'path';

export function isExist({ targetProjectPath: targetPath }) {
  return (
    existsSync(path.resolve(targetPath, './src/api/systemManage')) &&
    existsSync(path.resolve(targetPath, './src/views/system-manage'))
  );
}

export function getRequired() {
  return ['manage'];
}

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];
  if (!existsSync(path.resolve(targetPath, './src/api/systemManage'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/api/systemManage'),
      target: path.resolve(targetPath, './src/api/systemManage'),
    });
  }

  if (!existsSync(path.resolve(targetPath, './src/views/system-manage'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/views/system-manage'),
      target: path.resolve(targetPath, './src/views/system-manage'),
    });
  }
  return {
    copyConfig,
    updateConfig: [],
    devDependencies: [],
  };
}
