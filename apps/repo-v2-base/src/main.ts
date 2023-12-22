/* eslint-disable import/no-unresolved */
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import 'element-ui/lib/theme-chalk/index.css';
import '@/style/index.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './pinia';
import '@/plugins/element';
// import '@/plugins/support-webp';
import 'virtual:svg-icons-register';

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  pinia,
});

export default app;
