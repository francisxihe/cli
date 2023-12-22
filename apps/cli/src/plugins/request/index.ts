import type { CreateAxiosOptions } from '@fl/http';
import { CoreRequest } from '@fl/http';
import { ContentTypeEnum } from '@/plugins/request/type';
import { getTransform } from './transform';

// options?: Partial<CreateAxiosOptions>
export const createAxios = () => {
  const headers: Record<string, any> = {
    'Content-Type': ContentTypeEnum.JSON,
  };

  return new CoreRequest(<CreateAxiosOptions>{
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
    authenticationScheme: '',
    timeout: 5000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,

    headers,
    transform: getTransform({
      getToken: () => '',
    }),
    requestOptions: {
      // 接口地址
      apiUrl: 'http://127.0.0.1:7001',
      // 接口前缀
      apiPrefix: '/admin',
      // 是否自动添加接口前缀
      joinPrefix: true,
      // 是否携带 Token
      withToken: false,
      // 忽略重复请求
      ignoreRepeatRequest: true,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // post请求的时候添加参数到url
      joinParamsToUrl: false,
    },
  });
};

const request = createAxios();

export { request };
