import { RouteConfig } from 'vue-router';
// import { AsyncComponent, Component as _Component } from 'vue';

// type Component = Record<string, any> | _Component<any, any, any, any> | AsyncComponent<any, any, any, any>;

// type Dictionary<T> = { [key: string]: T };
export type Nullable<T = unknown> = T | null;

/**
 * @description 分页数据查询接口
 * @genericity T 查询params类型
 */
export interface IPageQuery<T = unknown> {
  pageSize: number;
  pageNumber: number;
  params: T;
}

/**
 * @description 分页数据返回data
 * @genericity T 分页数组列表单元类型
 */
export interface PageResData<T = unknown> {
  records: T;
  total: number;
  orders: Array<unknown>;
  optimizeCountSql: boolean;
  searchCount: boolean;
  pageSize: number;
  pageNumber: number;
  pages: number;
}

/**
 * @description 请求响应接口，接收两个泛型参数
 * @genericity U boolean 是否为分页数据
 * @genericity T 任意类型，决定返回值data
 */
export interface ResBody<T = unknown, U extends boolean = false> {
  code: number;
  data: U extends false ? T : PageResData<T>;
  msg: string;
  t: number;
}

export type Meta =
  | {
      icon?: string;
      title?: string;
      hidden?: boolean;
      auth?: string[];
      orderNo?: number | string;
    }
  | Record<string | symbol | number, any>;

export type RouterRaw<T = RouteConfig> = { [P in keyof T]: T[P] } & {
  meta?: Meta;
  component: any;
};
