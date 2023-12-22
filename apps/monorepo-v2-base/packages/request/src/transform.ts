import type { AxiosResponse } from 'axios';
import type { CreateAxiosOptions, RequestOptions, AxiosRequestConfigRetry } from '@fl/http';
import { AxiosTransform } from '@fl/http';
import { HttpResult } from './http-enum';
import { checkReturnCode } from './check';

export const transform = (opt: any) => {
  // 将对象转为Url参数
  const setObjToUrlParams = (baseUrl: string, obj: { [key: string]: any }): string => {
    let parameters = '';
    for (const key in obj) {
      parameters += `${key}=${encodeURIComponent(obj[key])}&`;
    }
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

      const hasSuccess = data && Reflect.has(data, 'code') && code === HttpResult.SUCCESS;
      if (hasSuccess) return data;
      else checkReturnCode(code, msg, opt);

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
      // TODO: 携带 Token 及其处理
      const { withToken } = (options as Record<string, any>)?.requestOptions ?? {};
      if (withToken) {
        // (config as Record<string, any>).headers['Authorization'] = options.authenticationScheme
        //   ? `${options.authenticationScheme} Token xxx`
        //   : 'Token xxx';
        (config as Recordable).headers['token'] = window.localStorage.getItem('token');
      }
      return config;
    },

    // 响应拦截器错误处理
    responseInterceptorsCatch: async (error: any) => {
      if (error.response.status === 401) {
        opt.Message.error('身份验证失败，请重新登录');
        //各个应用可根据createAxios传入的opt.loginTarget动态配置token失效跳转的页面
        //为了让用户看到提示信息 添加定时器
        setTimeout(() => {
          window.open(`${opt.loginTarget}/login`, '_self');
        }, 1000);
      } else {
        return Promise.reject(error);
      }
    },
  } as AxiosTransform;
};
