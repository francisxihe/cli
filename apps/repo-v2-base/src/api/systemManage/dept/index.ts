import { request } from '@/plugins/request';
import { Request, Response } from '@/api/common';
import { Role } from '../role';
import { User } from '../user';

export namespace Dept {
  export type Create = {
    name: string;
    /** 排序序号 */
    ordinal?: number;
    /** 父部门id */
    parentId: number;
    /** 机构负责人姓名 */
    leader?: string;
    /** 机构负责人电话 */
    phone?: string;
    /** 机构负责人用户id */
    leaderId?: number;
  };

  export type Update = Create & {
    version: number;
    id: number;
  };

  export type Detail = {
    /** 机构id */
    id: number;
    /** 机构名称 */
    name: string;
    /** 机构状态 */
    status: number;
    /** 机构创建人id */
    creator: number;
    /** 机构更新人id */
    updator: number;
    /** 创建时间 */
    createDate: string;
    /** 更新时间 */
    updateDate: string;
    /** 版本号，更新字段时作为乐观锁使用 */
    version: number;
    /** 机构父id */
    parentId: number;
    /** 机构排序序号 */
    ordinal: number;
    /** 机构负责人姓名 */
    leader: string;
    /** 机构负责人电话 */
    phone: string;
    /** 机构负责人用户id */
    leaderId: number;
  };

  export type PageItem = {
    id: number;
    /** 部门名称 */
    name: string;
    /** 当前状态 */
    status: number;
    /** 排序字段 */
    ordinal: number;
    /** 部门创建时间 */
    createDate: string;
    /** 部门最后更新时间 */
    updateDate: string;
    /** 当前记录版本号 */
    version: number;
    /** 创建人ID */
    creator: number;
    /** 更新人ID */
    updator: number;
    /** 父部门id */
    parentId: number;
    /** 机构负责人姓名 */
    leader: string;
    /** 机构负责人电话 */
    phone: string;
    /** 机构负责人用户id */
    leaderId: number;
  };

  export type TreeNode = {
    id: number;
    /** 部门名称 */
    name: string;
    /** 当前状态 */
    status: number;
    /** 排序字段 */
    ordinal: number;
    /** 部门创建时间 */
    createDate: string;
    /** 部门最后更新时间 */
    updateDate: string;
    /** 当前记录版本号 */
    version: number;
    /** 创建人ID */
    creator: number;
    /** 更新人ID */
    updator: number;
    /** 父部门id */
    parentId: number;
    /** 机构负责人姓名 */
    leader: string;
    /** 机构负责人电话 */
    phone: string;
    /** 机构负责人用户id */
    leaderId: number;
    /** 子机构 */
    children?: TreeNode[];
  };
}

/** 部门列表 */
export const getDeptPage = (
  params: Request.Page<undefined>,
): Promise<Response.Common<Response.DataPage<Dept.PageItem>>> => {
  return request.post({
    url: '/systems/sys-dept/page',
    data: params,
  });
};

/** 创建部门 */
export const createDept = (params: Dept.Create): Promise<Response.Common<any>> => {
  return request.post({
    url: '/systems/sys-dept/create',
    data: params,
  });
};

/** 更新部门 */
export const updateDept = (params: Dept.Update): Promise<Response.Common<any>> => {
  return request.post({
    url: `/systems/sys-dept/modify/${params.id}`,
    data: params,
  });
};

/** 获取机构详情 */
export const getDeptDetail = (id: number): Promise<Response.Common<Dept.Detail>> => {
  return request.get({ url: `/systems/sys-dept/${id}` });
};

/** 删除部门 */
export const deleteDept = (id: number): Promise<Response.Common<any>> => {
  return request.post({
    url: `/systems/sys-dept/remove/${id}`,
  });
};

/** 获取机构树 */
export const getDeptTree = (): Promise<Response.Common<Dept.TreeNode[]>> => {
  return request.get({
    url: `/systems/biz/dept/list-as-tree`,
  });
};

/** 根据机构id构对应的用户列表 */
export const getUserListByDeptId = (id: number): Promise<Response.Common<User.PageItem[]>> => {
  return request.get({
    url: `/systems/biz/user/list-by-dept/${id}`,
  });
};

/** 根据机构id绑定用户集合 */
export const deptBindUserList = ({
  deptId,
  userIdList,
}: {
  deptId: number;
  userIdList: number[];
}): Promise<Response.Common<undefined>> => {
  return request.post({
    url: `/systems/biz/dept/bind-users/${deptId}`,
    data: userIdList,
  });
};

/** 根据部门id获取角色 */
export const getRoleListByDeptId = (id: number): Promise<Response.Common<Role.PageItem[]>> => {
  return request.get({ url: `/systems/biz/role/list-by-dept/${id}` });
};

/** 根据用户id获取角色 */
export const getRoleListByUserId = (id: number): Promise<Response.Common<Role.PageItem[]>> => {
  return request.get({ url: `/systems/biz/role/list-by-user/${id}` });
};
