import path from 'path';
import { existsSync } from 'fs';

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];
  const devDependencies = [];

  if (!existsSync(path.resolve(targetPath, './src/plugins/element.ts'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/plugins/element.ts'),
      target: path.resolve(targetPath, './src/plugins/element.ts'),
    });

    devDependencies.push('element-ui@^2');
  }

  return {
    copyConfig,
    updateConfig: [
      {
        source: path.resolve(templatePath, './src/main.ts'),
        target: path.resolve(targetPath, './src/main.ts'),
        transformers: [
          (sourceAST, targetAST) => {
            if (targetAST.find(`import '@/plugins/element';`).generate()) {
              return targetAST;
            }
            targetAST.find(`import $$$ from 'vue';`).after(`import '@/plugins/element';`);
            return targetAST;
          },
          (sourceAST, targetAST) => {
            if (targetAST.find(`import 'element-ui/lib/theme-chalk/index.css';`).generate()) {
              return targetAST;
            }
            targetAST.find(`import '@/plugins/element';`).after(`import 'element-ui/lib/theme-chalk/index.css';`);
            return targetAST;
          },
        ],
      },
    ],
    devDependencies,
  };
}
