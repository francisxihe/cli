# http

> 使用方式

```js
import { request } from '@/plugins/request';

interface IDemoData {
  name?: string;
  age: number;
  male: number;
  email: string;
  github: string;
}

const Apis = {
  UserList: '/user/list',
  CreateUser: '/user/create',
};

export const getSystemList = () => {
  return request.get(
    {
      url: Apis.UserList,
      // 可选
      params: {
        page: 1,
      },
      // 可选
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

export const createUser = (data: IDemoData) => {
  return request.post({ url: Apis.CreateUser, data });
};
```
