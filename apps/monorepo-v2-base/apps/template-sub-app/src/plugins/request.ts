import { Message } from 'element-ui';
import { CoreRequest, createAxios, uploadAxios } from 'request';
import { getMainProps } from './microApp';

// @ts-ignore
export const request: CoreRequest = createAxios({
  Message,
  apiPrefix: process.env.BASE_URL,
  loginTarget: process.env.VUE_APP_GA_URL,
});

const portalsRequest: CoreRequest = createAxios({
  Message,
  apiPrefix: process.env.BASE_URL,
  loginTarget: process.env.VUE_APP_GA_URL,
});

export const getRequest = () => {
  const { source } = getMainProps();
  if (source === 'portals') {
    request.post = function (...args: any[]) {
      return portalsRequest.post(args[0]);
    } as CoreRequest['post'];

    request.get = function (...args: any[]) {
      return portalsRequest.get(args[0]);
    } as CoreRequest['get'];
  }
  return request;
};

// @ts-ignore
export const uploadFile: CoreRequest = uploadAxios({ Message, apiPrefix: process.env.VITE_API_URL });
