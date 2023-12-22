import { AppStation } from 'station';
import router from './router/index';
import store from './store/index';
import * as request from '@/plugins/request';
import { Api } from 'api';

const appStation: AppStation = new AppStation({
  name: '分析评价系统',
  getRouter: () => router,
  getStore: () => store,
});

appStation.registerPlugins({ request });

appStation.usePackage(Api);

export default appStation;
