import { CoreRequest } from 'request';
import { AppStation } from '../station';
let appStation: AppStation;

export const Api = {
  install(_appStation: any) {
    appStation = _appStation;
  },
};

export const getRequest = () => appStation.plugins.request.request || appStation.plugins.request.getRequest();
export const getUploadFile = () => appStation.plugins.request.uploadFile as CoreRequest;
export const downloadPostRequest = () => appStation.plugins.request.downloadPostRequest;

export * as api from './src/index';
