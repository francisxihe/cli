import { AppStation, ModuleStation } from 'station';
import VueRouter from 'vue-router';
import { Pinia } from 'pinia';
import { CoreRequest } from 'request';
import Dashboard from './views/index.vue';

let appStation: AppStation<VueRouter, Pinia, CoreRequest>;

export const ModuleDashboard: ModuleStation<VueRouter, Pinia, CoreRequest> = {
  install(_appStation) {
    appStation = _appStation;
    _appStation.registerModuleComponent('ModuleDashboard', {
      Dashboard,
    });
  },
};

export const getRouter = () => appStation.getRouter();
export const getStore = () => appStation.getStore();
export const getRequest = () => appStation.request;
export const getApi = () => appStation.api;
