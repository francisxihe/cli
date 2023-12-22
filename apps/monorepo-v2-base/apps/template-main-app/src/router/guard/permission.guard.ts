/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝 权限守卫
 * @copyright 🤝In me the tiger sniffs the rose.
 */

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import VueRouter from 'vue-router';

NProgress.configure({ showSpinner: false });

export const setupPermissionGuard = (router: VueRouter) => {
  router.beforeEach((to, from, next: any) => {
    NProgress.start();
    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });
};
