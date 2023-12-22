import VueRouter from 'vue-router';

const defaultRoutes = [
  {
    path: '/',
    template: '111111',
  },
];

export const allRoutes = [...defaultRoutes];

// // 获取原型对象上的push函数
// const originalPush = VueRouter.prototype.push;
// // 修改原型对象中的push方法
// VueRouter.prototype.push = function push(location) {
//   // @ts-ignore
//   return originalPush.call(this, location).catch((err) => err);
// };

const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: '/',
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
// export function resetRouter() {
//   const newRouter = createRouter();
//   // @ts-ignore: reset router
//   router.matcher = newRouter.matcher;
// }

export default router;
