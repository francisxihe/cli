import { SystemManage } from '@/api';

export namespace PermissionWeb {
  export type CreateWeb = SystemManage.Permission.Create;

  export type UpdateWeb = SystemManage.Permission.Update;
}
