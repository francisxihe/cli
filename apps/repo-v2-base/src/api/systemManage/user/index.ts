import { request } from '@/plugins/request';
import { Request, Response } from '@/api/common';

export namespace User {
  export type Create = {
    /** 用户名 */
    username: string;
    /** 用户名称 */
    name?: string;
    /** 用户手机号码 */
    mobile?: string;
    /** 部门ID */
    deptId: number;
    password: string;
  };

  export type Update = Omit<Create, 'password'> & {
    version: number;
    id: number;
  };

  export type PageItem = {
    id: number;
    /** 用户名 */
    username: string;
    /** 用户名称 */
    name: string;
    /** 用户手机号码 */
    mobile: string;
    /** 当前状态 */
    status: number;
    /** 用户注册时间 */
    createDate: string;
    /** 用户最后更新时间 */
    updateDate: string;
    /** 当前记录版本号 */
    version: number;
    /** 部门ID */
    deptId: number;
    /** 最后登录ip */
    loginIp: string;
    /** 登录时间 */
    loginDate: string;
  };

  export type UserInfo = {
    id: number;
    /** 用户名 */
    username: string;
  };
}

export const getUserPage = (
  params: Request.Page<{
    deptId?: number;
    username_like?: string;
    mobile_core?: string;
  }>,
): Promise<Response.Common<Response.DataPage<User.PageItem>>> => {
  return request.post({ url: `/systems/biz/user/page`, data: params });
};

/** 注册用户 */
// export const registerUser = (params: User.Create): Promise<Response.Common<any>> => {
//   return request.post({
//     url: `/systems/auth/register`,
//     data: qs.stringify(params),
//     headers: {
//       'Content-Type': ContentTypeEnum.FORM_URLENCODED,
//     },
//   });
// };

/** 创建用户 */
export const createUser = (params: User.Create): Promise<Response.Common<any>> => {
  return request.post({
    url: `/systems/biz/user/create`,
    data: params,
  });
};

/** 修改用户信息用户 */
export const updateUser = (params: User.Update): Promise<Response.Common<any>> => {
  return request.post({
    url: `/systems/sys-user/modify/${params.id}`,
    data: params,
  });
};

/** 设置用户状态可用 */
export const enableUser = (id: number): Promise<Response.Common<any>> => {
  return request.get({ url: `/systems/biz/user/enable/${id}` });
};

/** 设置用户状态不可用 */
export const disableUser = (id: number): Promise<Response.Common<any>> => {
  return request.get({ url: `/systems/biz/user/forbidden/${id}` });
};

/** 根据机构id构对应的用户列表 */
export const getUserByDeptId = (id: number): Promise<Response.Common<User.PageItem[]>> => {
  return request.get({ url: `/systems/biz/user/list-by-dept/${id}` });
};

/** 根据用户id绑定角色集合 */
export const userBindRoleList = ({
  userId,
  roleIdList,
}: {
  userId: number;
  roleIdList: number[];
}): Promise<Response.Common<undefined>> => {
  return request.post({ url: `/systems/biz/user/bind-roles/${userId}`, data: roleIdList });
};
