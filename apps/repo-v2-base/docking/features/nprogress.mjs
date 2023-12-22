import path from 'path';
import { existsSync } from 'fs';

export function isExist({ targetProjectPath: targetPath }) {
  return (
    existsSync(path.resolve(targetPath, './src/router/progress.ts')) &&
    existsSync(path.resolve(targetPath, './src/router/index.ts'))
  );
}

export function getRequired() {
  return ['router'];
}

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];
  const updateConfig = [];
  const devDependencies = [];

  if (!existsSync(path.resolve(targetPath, './src/router/progress.ts'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/router/progress.ts'),
      target: path.resolve(targetPath, './src/router/progress.ts'),
    });

    devDependencies.push('nprogress@^0');
  }

  if (!existsSync(path.resolve(targetPath, './src/router/index.ts'))) {
    updateConfig.push({
      source: path.resolve(templatePath, './src/router/index.ts'),
      target: path.resolve(targetPath, './src/router/index.ts'),
      transformers: [
        (sourceAST, targetAST) => {
          if (targetAST.find(`import $$$ from '@/router/progress';`).generate()) {
            return targetAST;
          }
          targetAST.find(`import $$$ from 'vue';`).after(`import { setProgress } from '@/router/progress';`);
          return targetAST;
        },
        (sourceAST, targetAST) => {
          if (targetAST.find(`setProgress(router);`).generate()) {
            return targetAST;
          }
          targetAST.find(`const router = createRouter();`).after(`setProgress(router);`);
          return targetAST;
        },
      ],
    });
  }
  return {
    copyConfig,
    updateConfig,
    devDependencies,
  };
}
