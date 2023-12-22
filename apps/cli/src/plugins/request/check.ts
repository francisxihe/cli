import { HttpResponseCode } from '@/plugins/request/type';

export const checkReturnCode = (code: number, msg: string): void => {
  let errorMsg = '';
  switch (code) {
    case HttpResponseCode.NOT_LOGIN:
      errorMsg = msg || '登录失效，请重新登录';
      break;
    case HttpResponseCode.SERVER_ERROR:
      errorMsg = msg || '服务器错误';
      break;
    default:
      errorMsg = msg || '未知错误';
      break;
  }
  if (errorMsg) {
    console.error(errorMsg);
    throw new Error(`FL_ERROR ${errorMsg}`);
  }
};
