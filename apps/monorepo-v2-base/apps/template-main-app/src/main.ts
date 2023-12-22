import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
// import '@/station';
import router from './router';
import pinia from './store';
import '@/plugins/element';
import '@/style/index.scss';
import '@/style/element-variables.scss';
import 'virtual:svg-icons-register';

Vue.use(Router);
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  pinia,
});

import '@/plugins/modules/index';
