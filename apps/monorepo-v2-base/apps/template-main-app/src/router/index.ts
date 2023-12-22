import { RouterRaw } from '../types/utils';
import VueRouter from 'vue-router';

import { setupRouterGuard } from './guard';
import appStation from '@/station';

const routerToArray = (routes: any): Array<RouterRaw> => {
  const arr: Array<RouterRaw> = [];
  Object.keys(routes).forEach((key: any) => {
    const mod = routes[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    arr.push(...modList);
  });
  return arr;
};

// 默认路由格式
// @ts-ignore
const routes = import.meta.glob('./routes/*.ts', { eager: true });
const routeDefaultModuleList = routerToArray(routes);

// 个人中心路由
// @ts-ignore
const routeCenter = import.meta.glob('./routes/center/*.ts', { eager: true });
const routeCenterModuleList = routerToArray(routeCenter);

const asyncRoutes: Array<RouterRaw> = [...routeDefaultModuleList];
export const centerRoutes: Array<RouterRaw> = [...routeCenterModuleList];

const defaultRoutes = [
  {
    path: '/',
    // component: appStation.getModuleComponent('Layout', 'Default'),
  },
  // {
  //   path: '/subapp/template-sub-app',
  //   // component: appStation.getModuleComponent('Layout', 'Default'),
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
];

export const allRoutes = [...defaultRoutes, ...asyncRoutes, ...centerRoutes];

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  // @ts-ignore
  return originalPush.call(this, location).catch((err) => err);
};

const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    routes: allRoutes as any,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) return savedPosition;
      else return { x: 0, y: 0 };
    },
  });
};

const router = createRouter();

/**
 * 刷新、重置路由
 * https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
export function resetRouter() {
  const newRouter = createRouter();
  // @ts-ignore: reset router
  router.matcher = newRouter.matcher;
}

setupRouterGuard(router);

export default router;
