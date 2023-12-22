import QueryString from 'qs';
import { ContentTypeEnum } from '@/plugins/request/type';
import { request } from '@/plugins/request';
import { Response } from '../common';
import { UserPermission } from './permission';

export interface IRequestLogin {
  username: string;
  password: string;
}
export interface IResponseLogin {
  code: string;
  username: string;
  id: number;
  token: string;
}
export const login = (params: IRequestLogin): Promise<Response.Common<IResponseLogin>> => {
  return request.post(
    {
      url: `/systems/auth/login`,
      data: QueryString.stringify(params),
      headers: {
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      },
    },
    {
      withToken: false,
    },
  );
};

export const getUserInfo = () => {
  return request.post({ url: '/systems/biz/user' });
};

/** 获取当前用户对应的权限 */
export const getUserPermission = (): Promise<Response.Common<UserPermission[]>> => {
  return request.get({ url: '/systems/biz/permission/list-by-current' });
};
