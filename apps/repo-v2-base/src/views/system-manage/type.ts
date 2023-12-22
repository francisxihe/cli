export enum ECommonEditorMode {
  Create = 'create',
  Update = 'update',
  View = 'view',
}

export interface ICommonEditor<T> {
  mode: ECommonEditorMode;
  visible: boolean;
  data: T;
}
