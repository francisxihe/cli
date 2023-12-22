import { AppStation, ModuleStation } from 'station';
import VueRouter from 'vue-router';
import { Pinia } from 'pinia';
import { CoreRequest } from 'request';
import Default from './default/index.vue';
import Page from './page/index.vue';

let appStation: AppStation<VueRouter, Pinia, CoreRequest>;

export const Layout: ModuleStation<VueRouter, Pinia, CoreRequest> = {
  install(_appStation) {
    appStation = _appStation;

    _appStation.registerModuleComponent('Layout', {
      Default,
      Page,
    });
  },
};

export const getRouter = () => appStation.getRouter();
export const getStore = () => appStation.getStore();
export const getRequest = () => appStation.request;
export const getApi = () => appStation.api;
