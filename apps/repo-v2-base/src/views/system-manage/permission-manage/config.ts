import { ECommonEditorMode } from '../type';

export const EditorModeMap: Record<ECommonEditorMode, string> = {
  create: '新增菜单',
  update: '修改菜单',
  view: '查看菜单',
};

export const permissionTypeMap: Record<string, any> = {
  0: '菜单',
  1: '按钮',
  2: '路由',
  3: '应用',
};

export const permissionRules = {
  name: [
    {
      required: true,
      message: '请输入菜单名称',
      trigger: 'blur',
    },
  ],
  location: [
    {
      required: true,
      message: '请输入菜单路径',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: '请选择菜单类型',
      trigger: 'blur',
    },
  ],
  parentId: [],
  ordinal: [
    {
      required: false,
      trigger: 'blur',
      validator(rule: unknown, value: number | string, next: Function) {
        if (value === undefined || value === '' || value === null) {
          next();
          return;
        }
        if (!Number.isInteger(Number(value)) || Number(value) < 1) {
          next(new Error('请输入大于0的整数!'));
          return;
        }
        next();
      },
    },
  ],
};
