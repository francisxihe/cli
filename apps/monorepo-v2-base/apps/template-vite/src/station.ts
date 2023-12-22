import { AppStation } from 'station';
import router from './router/index';
import store from './store/index';
import { request } from './plugins/request';
import * as api from './api/index';
import { ModuleDashboard } from 'module-dashboard/src/index';
import { ModuleCenter } from 'module-center/src/index';
import { Layout } from 'layout/src/index';
import VueRouter from 'vue-router';
import { Pinia } from 'pinia';
import { CoreRequest } from 'request';

const appStation = new AppStation<VueRouter, Pinia, CoreRequest>({
  getRouter: () => router,
  getStore: () => store,
  request,
  api,
});

appStation.useModule(Layout);
appStation.useModule(ModuleCenter);
appStation.useModule(ModuleDashboard);

export default appStation;
