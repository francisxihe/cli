import VueRouter from 'vue-router';
import sub from './routes/sub';

const defaultRoutes = [
  {
    path: '/index',
    component: () => import('@/views/index.vue'),
  },
];

export const allRoutes = [...defaultRoutes, ...sub];

const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: 'subapp/template-sub-app',
    routes: allRoutes as any,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) return savedPosition;
      else return { x: 0, y: 0 };
    },
  });
};

const router = createRouter();
console.log(router);

export default router;
