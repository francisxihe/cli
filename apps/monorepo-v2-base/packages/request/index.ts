import type { CreateAxiosOptions } from '@fl/http';
import { CoreRequest } from '@fl/http';
import { ContentTypeEnum } from './src/http-enum';
import { transform } from './src/transform';
import axios from 'axios';

export { CoreRequest };

// options?: Partial<CreateAxiosOptions>
export const createAxios = (opt: any) => {
  return new CoreRequest(<CreateAxiosOptions>{
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
    authenticationScheme: '',
    timeout: 5000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    transform: transform(opt),
    requestOptions: {
      // 接口地址
      apiUrl: '',
      // 接口前缀
      apiPrefix: opt.apiPrefix,
      // 是否自动添加接口前缀
      joinPrefix: true,
      // 是否携带 Token
      withToken: true,
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

// options?: Partial<CreateAxiosOptions>
export const uploadAxios = (opt: any) => {
  return new CoreRequest(<CreateAxiosOptions>{
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
    authenticationScheme: '',
    timeout: 5000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
    transform: transform(opt),
    requestOptions: {
      // 接口地址
      apiUrl: '',
      // 接口前缀
      // apiPrefix: '/api',
      apiPrefix: opt.apiPrefix,
      // 是否自动添加接口前缀
      joinPrefix: true,
      // 是否携带 Token
      withToken: true,
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

// 处理文件流 res：接口返回内容 type：文件mime类型 fileName: 文件名
const blobDownloadFile = (res: any, type: string, fileName: string) => {
  const blob = new Blob([res], {
    type: type,
  });
  const a = document.createElement('a');
  const URL = window.URL || window.webkitURL;
  const herf = URL.createObjectURL(blob);
  a.href = herf;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(herf);
};

// get
export const downloadGetRequest = (requestUrl: string, params: any, type: string, fileName: string, token: string) => {
  axios
    .get(requestUrl, {
      params: params,
      responseType: 'blob',
      headers: { token },
    })
    .then((res) => {
      blobDownloadFile(res.data, type, fileName);
    });
};

// post
export const downloadPostRequest = (requestUrl: string, params: any, type: string, fileName: string, token: string) => {
  axios.post(requestUrl, params, { responseType: 'blob', headers: { token } }).then((res) => {
    blobDownloadFile(res.data, type, fileName);
  });
};
