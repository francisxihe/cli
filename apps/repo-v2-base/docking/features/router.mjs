import path from 'path';
import { existsSync } from 'fs';

export function isExist({ targetProjectPath: targetPath }) {
  return existsSync(path.resolve(targetPath, './src/router/index.ts'));
}

export function getRequired() {
  return [];
}

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];
  const devDependencies = [];

  if (!existsSync(path.resolve(targetPath, './src/router/index.ts'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/router/index.ts'),
      target: path.resolve(targetPath, './src/router/index.ts'),
      transformers: [
        sourceAST => sourceAST.replace(`import { setProgress } from '@/router/progress';`, ``),
        sourceAST => sourceAST.replace(`const routes: RouteConfig[] = [$$$];`, `const routes: RouteConfig[] = [];`),
        sourceAST => sourceAST.replace(`setProgress(router);`, ``),
      ],
    });
    devDependencies.push('vue-router@^3');
  }
  return {
    copyConfig,
    updateConfig: [
      {
        source: path.resolve(templatePath, './src/main.ts'),
        target: path.resolve(targetPath, './src/main.ts'),
        transformers: [
          (sourceAST, targetAST) => {
            if (targetAST.find(`import $$$ from './router';`).generate()) {
              return targetAST;
            }
            targetAST.find(`import $$$ from 'vue';`).after(`import router from './router';`);
            return targetAST;
          },
          (sourceAST, targetAST) => {
            if (targetAST.find(`const app = new Vue({ $$$0,router,$$$1 });`).generate()) {
              return targetAST;
            }
            targetAST.replace(`const app = new Vue({ $$$0 });`, `const app = new Vue({ $$$0,router });`);
            return targetAST;
          },
        ],
      },
    ],
    devDependencies: ['vue-router@^3'],
  };
}
