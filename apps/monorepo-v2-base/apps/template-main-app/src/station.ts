import { AppStation } from 'station';
import router from './router/index';
import store from './store/index';
import * as request from '@/plugins/request';
import { Api } from 'api';
import { Layout } from 'layout/src/index';

const appStation = new AppStation({
  name: '微前端主应用',
  getRouter: () => router,
  getStore: () => store,
});

appStation.registerPlugins({ request });

appStation.useModule(Layout);
appStation.usePackage(Api);

export default appStation;
