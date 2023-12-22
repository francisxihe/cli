import path from 'path';
import { existsSync } from 'fs';

export function isExist({ targetProjectPath: targetPath }) {
  return (
    existsSync(path.resolve(targetPath, './src/store/index.ts')) &&
    existsSync(path.resolve(targetPath, './src/store/modules'))
  );
}

export function getRequired() {
  return [];
}

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];
  const devDependencies = [];

  if (!existsSync(path.resolve(targetPath, './src/store/index.ts'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/pinia/index.ts'),
      target: path.resolve(targetPath, './src/store/index.ts'),
    });
    devDependencies.push('pinia@^2');
  }

  if (!existsSync(path.resolve(targetPath, './src/store/modules'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/pinia/modules'),
      target: path.resolve(targetPath, './src/store/modules'),
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
            if (targetAST.find(`import $$$ from './store';`).generate()) {
              return targetAST;
            }
            targetAST.find(`import $$$ from 'vue';`).after(`import pinia from './store';`);
            return targetAST;
          },
          (sourceAST, targetAST) => {
            if (targetAST.find(`const app = new Vue({ $$$0,pinia,$$$1 });`).generate()) {
              return targetAST;
            }
            targetAST.replace(`const app = new Vue({ $$$0 });`, `const app = new Vue({ $$$0,pinia });`);
            return targetAST;
          },
        ],
      },
    ],
    devDependencies,
  };
}
