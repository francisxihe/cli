import { AppStation, ModuleStation } from 'station';
import VueRouter from 'vue-router';
import { Pinia } from 'pinia';
import { CoreRequest } from 'request';
import AffairsConsult from './views/affairs/consult.vue';
import AffairsManage from './views/affairs/manage.vue';
import DataLicense from './views/data/license.vue';
import DataMaterial from './views/data/material.vue';
import InfoAvatar from './views/info/avatar.vue';
import InfoBasic from './views/info/basic.vue';
import Space from './views/space/index.vue';

let appStation: AppStation<VueRouter, Pinia, CoreRequest>;

export const ModuleCenter: ModuleStation<VueRouter, Pinia, CoreRequest> = {
  install(_appStation) {
    appStation = _appStation;

    _appStation.registerModuleComponent('ModuleCenter', {
      AffairsConsult,
      AffairsManage,
      DataLicense,
      DataMaterial,
      InfoAvatar,
      InfoBasic,
      Space,
    });
  },
};

export const getRouter = () => appStation.getRouter();
export const getStore = () => appStation.getStore();
export const getRequest = () => appStation.request;
export const getApi = () => appStation.api;
