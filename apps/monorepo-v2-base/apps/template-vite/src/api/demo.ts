import { request } from '../plugins/request';

const Apis = {
  UserList: '/user/list',
  CreateUser: '/user/create',
};

export const getSystemList = () => {
  return request.get(
    {
      url: Apis.UserList,
      params: {
        page: 1,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
    // 可选参数
    // 返回原生响应头
    { isReturnNativeResponse: true },
  );
};

interface IDemoData {
  name?: string;
  age: number;
  male: number;
  email: string;
  github: string;
}
export const createUser = (data: IDemoData) => {
  return request.post({ url: Apis.CreateUser, data });
};
