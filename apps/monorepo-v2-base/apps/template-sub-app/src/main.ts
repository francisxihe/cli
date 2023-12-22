// 判断是否是qiankun环境，一定要写在最上面
if ((window as any).__POWERED_BY_QIANKUN__) {
  console.log(
    (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__,
    window,
    process.env.VUE_APP_PUBLIC_PATH,
    process.env.BASE_URL,
  );
  console.log('__webpack_public_path__', __webpack_public_path__);

  __webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;

  console.log('__webpack_public_path__22', __webpack_public_path__);
}

import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
// import '@/station';
import router from './router';
import '@/plugins/element';
import '@/style/index.scss';
import '@/style/element-variables.scss';
import { useMicroApp } from './plugins/microApp';

Vue.use(Router);

Vue.config.productionTip = false;

// 设置全局变量，用于保存或销毁Vue实例
let instance: any = null;

function render(props?: any) {
  const { container } = props || {};

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#sub-app') : '#sub-app'); // 用于限定当前上下文下的#app，防止与主应用中的#app冲突
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

// unmount放在micApp，切换路由子应用没有销毁
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}

export const { bootstrap, mount, update } = useMicroApp(render, instance);
