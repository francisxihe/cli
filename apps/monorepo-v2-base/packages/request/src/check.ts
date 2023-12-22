import { HttpResult } from './http-enum';

export const checkReturnCode = (code: number, msg: string, opt: any): void => {
  let errorMsg = '';
  switch (code) {
    case HttpResult.NOT_LOGIN:
      errorMsg = msg || '登录失效，请重新登录';
      break;
    case HttpResult.SERVER_ERROR:
      errorMsg = msg || '服务器错误';
      break;
    default:
      errorMsg = msg || '未知错误';
      break;
  }
  if (errorMsg) {
    opt.Message.error(errorMsg);
    throw new Error(`FL_ERROR ${errorMsg}`);
  }
};
