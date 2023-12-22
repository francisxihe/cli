import VueRouter, { RouteConfig } from 'vue-router';
import Vue from 'vue';
import { setProgress } from '@/router/progress';

Vue.use(VueRouter);

const getAsyncRoutes = (): Array<RouteConfig> => {
  const tempRoutes: Array<RouteConfig> = [];

  const arr = import.meta.glob('./routes/*.ts', { eager: true });

  Object.values(arr).forEach(item => {
    const mod = (item as { default: Array<RouteConfig> | RouteConfig }).default;
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    tempRoutes.push(...modList);
  });

  return tempRoutes;
};

export const asyncRoutes = getAsyncRoutes();

const routes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/login',
  },
];

export const allRoutes = [...routes, ...asyncRoutes];

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    // base: '/',
    routes: allRoutes,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) return savedPosition;
      return { x: 0, y: 0 };
    },
  });

const router = createRouter();

setProgress(router);

export default router;
