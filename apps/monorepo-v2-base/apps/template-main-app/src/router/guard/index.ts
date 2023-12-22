import VueRouter from 'vue-router';
import { setupPermissionGuard } from './permission.guard';

export const setupRouterGuard = (router: VueRouter) => {
  setupPermissionGuard(router);
};
