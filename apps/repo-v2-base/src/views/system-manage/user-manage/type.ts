import { SystemManage } from '@/api';

export namespace UserWeb {
  export type CreateWeb = SystemManage.User.Create & {
    checkPassword: string;
  };

  export type UpdateWeb = SystemManage.User.Update;
}
