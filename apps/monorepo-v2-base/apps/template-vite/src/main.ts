import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import router from './router';
import pinia from './store';
import { setupRouterGuard } from './guard';
import directive from 'directive';
import '@/plugins/element';
import '@/plugins/support-webp';
import 'element-ui/lib/theme-chalk/index.css';
import 'style/index.scss';
import 'virtual:svg-icons-register';

Vue.use(Router);
Vue.use(directive);

setupRouterGuard(router);

if (import.meta.env.NODE_ENV === 'production') Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  pinia,
});
