import { ECommonEditorMode } from '../type';

export const EditorModeMap: Record<ECommonEditorMode, string> = {
  create: '新增部门',
  update: '修改部门',
  view: '查看部门',
};

export const deptRules = {
  name: [
    {
      required: true,
      message: '请输入部门名称',
      trigger: 'blur',
    },
  ],
  parentId: [],
  leader: [],
  phone: [
    {
      trigger: 'blur',
      validator(rule: unknown, value: string, next: Function) {
        console.log(value);

        if (value === '' || value === undefined || value === null) {
          next();
          return;
        }
        const reg = /^1\d{10}$/;
        if (!reg.test(value)) {
          next(new Error('手机号码格式不正确'));
        }
        next();
      },
    },
  ],
  leaderId: [
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
