import path from 'path';
import { existsSync } from 'fs';

export function isExist({ targetProjectPath: targetPath }) {
  return existsSync(path.resolve(targetPath, './src/mock'));
}

export function getRequired() {
  return ['api'];
}

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];
  const devDependencies = ['mockjs@1', 'json-schema-faker@0'];

  if (!existsSync(path.resolve(targetPath, './src/mock'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/mock'),
      target: path.resolve(targetPath, './src/mock'),
    });
  }
  return {
    copyConfig,
    updateConfig: [
      {
        source: path.resolve(templatePath, './src/main.ts'),
        target: path.resolve(targetPath, './src/main.ts'),
        transformers: [
          (sourceAST, targetAST) => {
            if (targetAST.find(`import '@/mock/index';`).generate()) {
              return targetAST;
            }
            targetAST.find(`import $$$ from 'vue';`).after(`import '@/mock/index';`);
            return targetAST;
          },
        ],
      },
    ],
    devDependencies,
  };
}
