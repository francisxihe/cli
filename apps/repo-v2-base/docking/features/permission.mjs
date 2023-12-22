import path from 'path';
import { existsSync } from 'fs';

export function isExist({ targetProjectPath: targetPath }) {
  return (
    existsSync(path.resolve(targetPath, './src/api/system')) &&
    existsSync(path.resolve(targetPath, './src/store/modules/user.ts'))
  );
}

export function getRequired() {
  return ['api', 'pinia', 'router'];
}

export function getCreateConfig({ templateProjectPath: templatePath, targetProjectPath: targetPath }) {
  const copyConfig = [];
  const updateConfig = [];

  [
    {
      source: './src/api/system',
      target: './src/api/system',
    },
    {
      source: './src/views/login',
      target: './src/views/login',
    },
    {
      source: './src/common',
      target: './src/common',
    },
    {
      source: './src/plugins/request',
      target: './src/plugins/request',
    },
    {
      source: './src/components/SvgIcon',
      target: './src/components/SvgIcon',
    },
    {
      source: './src/pinia/modules/user.ts',
      target: './src/store/modules/user.ts',
    },
  ].forEach(item => {
    if (!existsSync(path.resolve(targetPath, item.target))) {
      copyConfig.push({
        source: path.resolve(templatePath, item.source),
        target: path.resolve(targetPath, item.target),
      });
    }
  });

  if (!existsSync(path.resolve(targetPath, './src/router/index.ts'))) {
    copyConfig.push({
      source: path.resolve(templatePath, './src/router/index.ts'),
      target: path.resolve(targetPath, './src/router/index.ts'),
      transformers: [
        (sourceAST, targetAST) => {
          if (targetAST.find(`const routes: RouteConfig[] = [];`).generate()) {
            targetAST.replace(
              `const routes: RouteConfig[] = [];`,
              `const routes: RouteConfig[] = [
                      {
                        path: '/login',
                        component: () => import('@/views/login/index.vue'),
                      },
                      {
                        path: '/',
                        redirect: '/login',
                      },
                    ];`,
            );
          }

          return targetAST;
        },
      ],
    });
  }

  return {
    copyConfig,
    updateConfig,
  };
}
