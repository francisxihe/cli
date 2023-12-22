import { ECommonEditorMode } from '../type';

export const EditorModeMap: Record<ECommonEditorMode, string> = {
  create: '新增用户',
  update: '修改用户',
  view: '查看用户',
};

export const UserStatusMap: Record<number, string> = {
  [-1]: '禁用',
  1: '启用',
};
