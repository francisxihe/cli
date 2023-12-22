import { EPermissionType } from './enum';

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

export type UserInfo = {
  id: number;
  /** 用户名 */
  username: string;
};
