export type TableColumnType = 'selection' | 'index' | 'expand';

export type TableColumnConfig<R = unknown> = Partial<{
  type: TableColumnType;
  index: number | { (index: number): any };
  columnKey: string;
  label: string;
  prop: keyof R | string;
  width: string | number;
  minWidth: string;
  fixed: boolean | 'left' | 'right';
  renderHeader: { (col: any): any };
  sortable: boolean | 'custom';
  sortMethod: { (a: any, b: any): any };
  sortBy: string | any[] | { (row: R, index: any): any };
  sortOrders: 'ascending' | 'descending' | null[];
  resizable: boolean;
  formatter: { (row: R, column: any, cellValue: any, index: number): any };
  showOverflowTooltip: boolean;
  align: 'left' | 'center' | 'right';
  headerAlign: 'left' | 'center' | 'right';
  className: string;
  labelClassName: string;
  selectable: { (row: R, index: any): any };
  reserveSelection: boolean;
  filters: Array<{ text: any; value: any }>;
  filterPlacement: string;
  filterMultiple: boolean;
  filterMethod: { (value: any, row: R, column: any): any };
  filteredValue?: any[];
  render: { (row: R, index: number): any };
}>;

export interface PageConfig {
  pageNumber: number;
  pageSize: number;
  total: number;
}

export enum SimpleFormEnum {
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  INPUT = 'INPUT',
  INPUT_NUMBER = 'INPUT_NUMBER',
  SELECT = 'SELECT',
  CASCADER = 'CASCADER',
  SWITCH = 'SWITCH',
  SLIDER = 'SLIDER',
  TIME_PICKER = 'TIME_PICKER',
  DATE_PICKER = 'DATE_PICKER',
  DATE_TIME_PICKER = 'DATE_TIME_PICKER',
}

export type SimpleForm =
  | 'RADIO'
  | 'CHECKBOX'
  | 'INPUT'
  | 'INPUT_NUMBER'
  | 'SELECT'
  | 'CASCADER'
  | 'SWITCH'
  | 'SLIDER'
  | 'TIME_PICKER'
  | 'DATE_PICKER'
  | 'DATE_TIME_PICKER';

export type FormSize = 'medium' | 'small' | 'mini';

export type RadioConfig = {
  label: string;
  disabled: boolean;
  border: boolean;
  size: FormSize;
  name: string;
};

export type CheckBoxConfig = {
  label: string | number | boolean;
  trueLabel: string | number;
  falseLabel: string | number;
  disabled: boolean;
  border: boolean;
  size: FormSize;
  name: string;
  checked: boolean;
  indeterminate: boolean;
};

export type InputConfig = {
  maxlength: number;
  minlength: number;
  showWordLimit: boolean;
  placeholder: string;
  clearable: false;
  showPassword: boolean;
  disabled: boolean;
  size: FormSize;
  prefixIcon: string;
  suffixIcon: string;
  rows: number;
  autosize: boolean;
  autocompelete: 'on' | 'off';
  name: string;
  readonly: boolean;
  max: string | number;
  min: string | number;
  step: string | number;
  resize: 'none' | 'both' | 'horizontal' | 'vertical';
  autofocus: boolean;
  form: string;
  label: string;
  tabindex: string;
  validateEvent: boolean;
};

export type InputNumberConfig = {
  min: number;
  max: number;
  step: number;
  stepStrictly: boolean;
  precision: number;
  size: FormSize;
  disabled: boolean;
  controls: boolean;
  controlsPosition: string;
  name: string;
  label: string;
  placeholder: string;
};

export type SelectConfig = {
  multiple: boolean;
  disabled: boolean;
  valueKey: string;
  size: FormSize;
  clearable: boolean;
  collapseTags: boolean;
  multipleLimit: boolean;
  name: string;
  autocomplete: 'on' | 'off';
  placeholder: string;
  filterable: boolean;
  allowCreate: boolean;
  filterMethod: (...args: any) => any;
  remote: boolean;
  remoteMethod: (...args: any) => any;
  loading: boolean;
  loadingText: string;
  noMatchText: string;
  noDataText: string;
  popperClass: string;
  reserveKeyword: boolean;
  defaultFirstOption: boolean;
  popperAppendToBody: boolean;
  automaticDropdown: boolean;
};

export type CascaderProps = {
  expandTrigger: 'click' | 'hover';
  multiple: boolean;
  checkStrictly: boolean;
  emitPath: boolean;
  lazy: boolean;
  lazyLoad: (node: unknown, resolve: { (): void }) => void;
  value: string;
  label: string;
  children: string;
  disabled: string;
  leaf: string;
};

export type CascaderConfig<T = unknown> = {
  options: Array<T>;
  props: CascaderProps;
  size: FormSize;
  placeholder: string;
  disabled: boolean;
  clearable: boolean;
  showAllLevels: boolean;
  collapseTags: boolean;
  separator: string;
  filterable: boolean;
  filterMethod: (node: unknown, keyword: string) => boolean;
  debounce: number;
  beforeFilter: { (...args: any): Promise<unknown> | boolean };
  popperClass: string;
};

export type SwitchConfig = {
  disabled: boolean;
  width: number;
  activeIconClass: string;
  inactiveIconClass: string;
  activeText: string;
  inactiveText: string;
  activeValue: boolean | string | number;
  inactiveValue: boolean | string | number;
  activeColor: string;
  inactiveColor: string;
  name: string;
  validateEvent: boolean;
};

// export type

export type CustomerComConfig = Record<string, unknown>;

export type SimpleFormConfig = {
  grid: boolean; //栅格化
};
export type SimpleFormItemConfig = {
  item: SimpleForm;
  label: string;
  config: RadioConfig;
};
