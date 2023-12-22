import type { AxiosResponse } from 'axios';
import type { CreateAxiosOptions, RequestOptions, AxiosRequestConfigRetry } from '@fl/http';
import { AxiosTransform } from '@fl/http';
import { HttpResponseCode } from '@/plugins/request/type';
import { checkReturnCode } from './check';

export const getTransform = ({ getToken }: { getToken: () => string | undefined }) => {
  // 将对象转为Url参数
  const setObjToUrlParams = (baseUrl: string, obj: Record<string, any>): string => {
    let parameters = '';
    Object.keys(obj).forEach(key => {
      parameters += `${key}=${encodeURIComponent(obj[key])}&`;
    });
    parameters = parameters.replace(/&$/, '');
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
  };

  return {
    // 数据转换前Hook
    transformRequestHook: (res: AxiosResponse, options: RequestOptions) => {
      const { isReturnNativeResponse } = options;

      // 返回原生响应头，不进行转换
      if (isReturnNativeResponse) return res;

      const { data } = res;
      if (!data) throw new Error('FL_ERROR: Data is empty');

      const { code, msg } = data;

      const isSuccess = data && Reflect.has(data, 'code') && code === HttpResponseCode.SUCCESS;

      if (isSuccess) return data;
      checkReturnCode(code, msg);

      throw new Error(`FL_ERROR ${msg}`);
    },

    // 请求前Hook
    beforeRequestHook: (config: AxiosRequestConfigRetry, options: RequestOptions) => {
      const { apiUrl, apiPrefix, joinPrefix, joinParamsToUrl } = options;

      // 拼接接口地址
      if (joinPrefix) config.url = `${apiPrefix}${config.url}`;

      // 直接拼接 url 和 接口地址
      // TODO: 后期可在 mock 机制中使用，暂时不用
      if (apiUrl) config.url = `${apiUrl}${config.url}`;

      // 拼接参数到 url
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(config.url as string, {
          ...config.params,
          ...config.data,
        });
      }
      return config;
    },

    // 请求拦截器
    requestInterceptors: (config: AxiosRequestConfigRetry, options: CreateAxiosOptions) => {
      let withToken;
      if ((config as Record<string, any>).requestOptions.withToken !== undefined) {
        withToken = (config as Record<string, any>).requestOptions.withToken;
      } else {
        withToken = (options as Record<string, any>).requestOptions.withToken;
      }

      if (withToken === true) {
        const token = getToken();
        if (token) {
          (config as Recordable).headers.token = getToken();
        } else {
          throw new Error('用户无权限');
        }
      }
      return config;
    },

    // 响应拦截器错误处理
    responseInterceptorsCatch: async (error: any) => {
      const { config, response } = error;
      return Promise.reject(error);
    },
  } as AxiosTransform;
};
