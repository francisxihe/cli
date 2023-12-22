declare module 'API' {
  export namespace Response {
    export type Common<T> = {
      code: 200 | 401 | 403 | 404 | 500;
      data: T;
      msg?: string;
    };

    export type DataPage<T> = {
      records: T[];
      total: number; //总条数
      pageSize: number; //当前页条数
      pageNumber: number; //当前页
      pages: number; //总页数
    };
  }
  namespace Request {
    export type Page<T> = {
      params: T;
      pageSize: number; //当前页条数
      pageNumber: number; //当前页
    };
  }
}
