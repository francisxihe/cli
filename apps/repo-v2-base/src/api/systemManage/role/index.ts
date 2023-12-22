import { request } from '@/plugins/request';
import { Request, Response } from '@/api/common';
import { Dept } from '../dept';
import { Permission } from '../permission';
import { User } from '../user';

export namespace Role {
  export type Create = {
    name: string;
    ordinal: number;
  };

  export type Update = Create & {
    version: number;
    id: number;
  };

  export type PageItem = {
    id: number;
    /** 角色名称 */
    name: string;
    status: number; // 当前状态
    ordinal: number; // 排序字段
    createDate: string; // 用户注册时间
    updateDate: string; // 用户最后更新时间
    version: number; // 当前记录版本号
  };
}

/** 角色列表 */
export const getRolePage = (
  params: Request.Page<
    | {
        name_like?: string;
        dept_id?: number;
      }
    | undefined
  >,
): Promise<Response.Common<Response.DataPage<Role.PageItem>>> => {
  return request.post({ url: '/systems/biz/role/page', data: params });
};

/** 创建角色 */
export const createRole = (params: Role.Create): Promise<Response.Common<any>> => {
  return request.post({ url: '/systems/sys-role/create', data: params });
};

/** 更新角色 */
export const updateRole = (params: Role.Update): Promise<Response.Common<any>> => {
  return request.post({ url: `/systems/sys-role/modify/${params.id}`, data: params });
};

/** 删除角色 */
export const deleteRole = (id: number): Promise<Response.Common<any>> => {
  return request.post({ url: `/systems/sys-role/remove/${id}` });
};

/** 根据机构id获取角色集合 */
export const getRoleByDeptId = (id: number): Promise<Response.Common<Role.PageItem[]>> => {
  return request.get({ url: `/systems/biz/role/list-by-dept/${id}` });
};

/** 根据角色id获取菜单 */
export const getPermissionListByRoleId = (id: number): Promise<Response.Common<Permission.PageItem[]>> => {
  return request.get({ url: `/systems/biz/permission/list-by-role/${id}` });
};

/** 根据角色id获取用户 */
export const getUserListByRoleId = (id: number): Promise<Response.Common<User.PageItem[]>> => {
  return request.get({ url: `/systems/biz/user/list-by-role/${id}` });
};
/** 根据角色id获取部门 */
export const getDeptListByRoleId = (id: number): Promise<Response.Common<Dept.PageItem[]>> => {
  return request.get({ url: `/systems/biz/dept/list-by-role/${id}` });
};

/** 根据角色id绑定菜单集合 */
export const roleBindPermissionList = ({
  roleId,
  permissionIdList,
}: {
  roleId: number;
  permissionIdList: number[];
}): Promise<Response.Common<undefined>> => {
  return request.post({ url: `/systems/biz/role/bind-permissions/${roleId}`, data: permissionIdList });
};

/** 根据角色id绑定用户集合 */
export const roleBindUserList = ({
  roleId,
  userIdList,
}: {
  roleId: number;
  userIdList: number[];
}): Promise<Response.Common<undefined>> => {
  return request.post({ url: `/systems/biz/role/bind-users/${roleId}`, data: userIdList });
};

/** 根据角色id绑定部门集合 */
export const roleBindDeptList = ({
  roleId,
  deptIdList,
}: {
  roleId: number;
  deptIdList: number[];
}): Promise<Response.Common<undefined>> => {
  return request.post({ url: `/systems/biz/role/bind-depts/${roleId}`, data: deptIdList });
};
