import { request } from '@/plugins/request';
import { Request, Response } from '@/api/common';
import { EPermissionType } from './enum';

export namespace Permission {
  /** 创建Permission */
  export type Create = {
    name: string;
    ordinal?: number;
    /** 菜单父id */
    parentId?: number;
    /** 路由菜单路径 */
    location: string;
    /** 菜单类型0表示菜单类型,0=菜单,1=按钮,2=路由,3=应用 */
    type: EPermissionType;
    /** 重定向路径 */
    redirect?: string;
    /** 隐藏 */
    hidden?: number;
  };

  export type Update = Create & {
    version: number;
    id: number;
  };

  export type PageItem = {
    id: number;
    /** 菜单名称 */
    name: string;
    /** 当前状态 */
    status: number;
    /** 排序字段 */
    ordinal: number;
    /** 菜单创建时间 */
    createDate: string;
    /** 菜单最后更新时间 */
    updateDate: string;
    /** 当前记录版本号 */
    version: number;
    /** 创建人ID */
    creator: number;
    /** 更新人ID */
    updator: number;
    /** 路由菜单路径 */
    location: string;
    /** 菜单类型0表示菜单类型,0=菜单,1=按钮,2=路由,3=应用 */
    type: EPermissionType;
    /** 父菜单id */
    parentId: number;
    /** 重定向路径 */
    redirect: string;
    /** 隐藏 */
    hidden: number;
  };

  export type Detail = {
    /** 菜单id */
    id: number;
    /** 菜单名称 */
    name: string;
    /** 当前状态 */
    status: number;
    /** 菜单创建人id */
    creator: number;
    /** 菜单更新人id */
    updator: number;
    /** 创建时间 */
    createDate: string;
    /** 更新时间 */
    updateDate: string;
    /** 版本号，更新字段时作为乐观锁使用 */
    version: number;
    /** 菜单路径 */
    location: string;
    /** 菜单父id */
    parentId: number;
    /** 菜单类型 */
    type: number;
    /** 排序序号 */
    ordinal: number;
    /** 重定向路径 */
    redirect: string;
    /** 隐藏 */
    hidden: number;
  };

  export interface TreeNode {
    id: number;
    /** 菜单名称 */
    name: string;
    /** 当前状态 */
    status: number;
    /** 排序字段 */
    ordinal: number;
    /** 菜单类型0表示菜单类型,0=菜单,1=按钮,2=路由,3=应用 */
    type: EPermissionType;
    /** 路由菜单路径 */
    location: string;
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
    /** 父菜单id */
    parentId: number;
    /** 子菜单 */
    children?: TreeNode[];
    /** 重定向路径 */
    redirect: string;
    /** 隐藏 */
    hidden: number;
  }

  /** 当前用户权限 */
  export type UserPermission = {
    id: number;
    /** 菜单名称 */
    name: string;
    /** 当前状态 */
    status: number; //
    /** 排序字段 */
    ordinal: number;
    /** 菜单创建时间 */
    createDate: string; //
    /** 菜单最后更新时间 */
    updateDate: string; //
    /** 路由菜单路径 */
    location: string;
    /** 菜单类型0表示菜单类型,0=菜单,1=按钮,2=路由,3=应用 */
    type: EPermissionType;
    /** 父菜单id */
    parentId: number;
    /** 重定向路径 */
    redirect: string;
    /** 隐藏 */
    hidden: number;
  };

  /** 当前用户权限 */
  export type UserPermissionWeb = {
    name: string;
    path: string;
    title: string;
    level: number;
    type: EPermissionType;
    parentName: string;
    /** 排序字段 */
    ordinal: number;
    children: UserPermissionWeb[];
    /** 重定向路径 */
    redirect: string;
    /** 隐藏 */
    hidden: number;
  };
}

/** 菜单列表 */
export const getPermissionPage = (
  params: Request.Page<
    | {
        name_like?: string;
        mobile_core?: string;
      }
    | undefined
  >,
): Promise<Response.Common<Response.DataPage<Permission.PageItem>>> => {
  return request.post({ url: '/systems/sys-permission/page', data: params });
};

/** 创建菜单 */
export const createPermission = (params: Permission.Create): Promise<Response.Common<any>> => {
  return request.post({ url: '/systems/sys-permission/create', data: params });
};

/** 更新菜单 */
export const updatePermission = (params: Permission.Update): Promise<Response.Common<any>> => {
  return request.post({ url: `/systems/sys-permission/modify/${params.id}`, data: params });
};

/** 删除菜单 */
export const deletePermission = (id: number): Promise<Response.Common<any>> => {
  return request.post({ url: `/systems/sys-permission/remove/${id}` });
};

/** 获取机构树 */
export const getPermissionTree = (): Promise<Response.Common<Permission.TreeNode[]>> => {
  return request.get({ url: `/systems/biz/permission/list-as-tree` });
};

/** 获取菜单详情 */
export const getPermissionDetail = (id: number): Promise<Response.Common<Permission.Detail>> => {
  return request.get({ url: `/systems/sys-permission/${id}` });
};
