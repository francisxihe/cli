import VueRouter from 'vue-router';
import { getCurrentInstance, shallowRef } from 'vue';

/**
 * 🔥🔥🔥
 * 请使用官方useRouter hook
 * 示例:
 * import { useRouter, useRoute } from 'vue-router/composables';
 *
 * const router = useRouter();
 * const route = useRoute();
 */

/**
 * 勿用 🐛🐛🐛
 * import { useRouter, useRoute } from '@/hooks';
 * const { route, router } = useRouter();
 * console.log(router);
 * console.log(route?.value);
 */

export interface Router extends VueRouter {
  isReady: () => Promise<void>;

  /** @deprecated */
  app: VueRouter['app'];

  /** @deprecated */
  getMatchedComponents: VueRouter['getMatchedComponents'];

  /** @deprecated use `isReady` instead */
  onReady: VueRouter['onReady'];
}

export function useRouter(): Router {
  const vm = getCurrentInstance();
  if (vm) return vm.proxy.$router as Router;

  console.warn('Failed to get router instance, maybe you are out of scope.');

  return undefined as any;
}

const currentRoute = shallowRef();

export function useRoute() {
  if (!currentRoute.value) {
    const vm = getCurrentInstance();

    if (!vm) {
      console.warn('请在 setup 中调用。');
      return;
    }

    currentRoute.value = vm.proxy.$route;

    // 每次路由切换时，更新 route 参数
    const router = useRouter();
    router.afterEach((to) => (currentRoute.value = to));
  }

  return currentRoute;
}
