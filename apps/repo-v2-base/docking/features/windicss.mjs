import { existsSync } from 'fs';
import path from 'path';

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];
  const devDependencies = [];

  if (!existsSync(path.resolve(targetPath, './windi.config.ts'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './windi.config.ts'),
      target: path.resolve(targetPath, './windi.config.ts'),
    });
    devDependencies.push('windicss@^3', 'vite-plugin-windicss@1');
  }
  return {
    copyConfig,
    updateConfig: [
      {
        source: './src/main.ts',
        target: './src/main.ts',
        transformers: [
          (sourceAST, targetAST) => {
            if (targetAST.find(`import 'virtual:windi-base.css';`).generate()) {
              return targetAST;
            }
            targetAST.find(`import $$$ from 'vue';`)
              .before(`import 'virtual:windi-base.css';\nimport 'virtual:windi-components.css';\n
            import 'virtual:windi-utilities.css';`);
            return targetAST;
          },
        ],
      },
      {
        source: './build/vite/plugin/index.ts',
        target: './build/vite/plugin/index.ts',
        transformers: [
          (sourceAST, targetAST) => {
            if (targetAST.find(`vitePlugins.push(windiCSS());`).generate()) {
              return targetAST;
            }
            targetAST.find(`const vitePlugins: $$$ = $_$0;`).after(`vitePlugins.push(windiCSS());\n`);
            return targetAST;
          },
          (sourceAST, targetAST) => {
            if (targetAST.find(`import windiCSS from 'vite-plugin-windicss';`).generate()) {
              return targetAST;
            }
            targetAST
              .find(`import vue from '@vitejs/plugin-vue2';`)
              .after(`import windiCSS from 'vite-plugin-windicss';`);
            return targetAST;
          },
        ],
      },
    ],
    devDependencies,
  };
}
