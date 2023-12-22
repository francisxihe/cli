import VueRouter, { RouteRecord } from 'vue-router';

const routerToArray = (routes: any): Array<RouteRecord> => {
  const arr: Array<RouteRecord> = [];
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

export const asyncRoutes: Array<RouteRecord> = [...routeDefaultModuleList];
export const centerRoutes: Array<RouteRecord> = [...routeCenterModuleList];

const defaultRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/404',
    component: () => import('@/views/result/404/index.vue'),
    hidden: true,
    meta: {
      title: '404',
    },
  },
];

export const allRoutes = [...defaultRoutes, ...asyncRoutes, ...centerRoutes];

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    // base: '/',
    routes: allRoutes as any,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) return savedPosition;
      else return { x: 0, y: 0 };
    },
  });

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

export default router;
