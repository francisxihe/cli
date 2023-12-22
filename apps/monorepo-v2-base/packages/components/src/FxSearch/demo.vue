<!--
 * @Author: shill shill@fline88.com
 * @Date: 2022-09-23 18:00:31
 * @LastEditors: shill
 * @LastEditTime: 2022-10-20 15:24:02
 * @FilePath: \hljga-items-pages\src\components\FxSearch\demo.vue
 * @Description: 
-->
<template>
  <div>
    <h1>查询模板</h1>
    <fx-form-search
      ref="searchForm"
      :form-item="formItem"
      :options-data="optionsData"
      :rule-form="ruleForm"
      :function-list="functionList"
    >
    </fx-form-search>
  </div>
</template>

<script lang="ts" setup>
import fxFormSearch from './index.vue';

import { ref } from 'vue';
// let searchGirdConfig = ref({
//   toggleCollapse: false,
// });

const bjjdOptions = ref([]);

const optionsData = ref({
  bjjdOptions: bjjdOptions,
});

// interface formItemType {
//   type?: string;
//   label: string;
//   show: boolean;
//   require?: string;
//   placeholder?: string;
//   prop: string;
//   grid?: object;
//   slot?: object;
//   callback?: Function;
//   options: any[]
// }
const formItem = ref([
  { type: 'text', label: '搜索条件', prop: 'searchText', require: true, show: true },
  { type: 'datetimerange', label: '申报时间', prop: 'datetimerange', require: true, show: true },
  { type: 'text', label: '办理编号', prop: 'number', require: true, show: true },
  { type: 'text', label: '处理人姓名', prop: 'username', require: true, show: true },
  {
    type: 'select',
    label: '省份',
    // label: '用户类型',
    prop: 'userType',
    require: true,
    options: getSelectData(),
    change: selectChange,
    show: true,
  },

  {
    type: 'select',
    // label: '办件进度',
    label: '市/区',
    prop: 'bjjd',
    require: true,
    change: bjjdChange,
    options: 'bjjdOptions',
    show: true,
  },
  {
    type: 'select',
    label: '办件警钟',
    prop: 'bjjz',
    require: true,
    options: [{ label: '单选一', value: 1 }],
    show: true,
  },
  {
    type: 'select',
    label: '办件部门',
    prop: 'department',
    require: true,
    options: [{ label: '单选一', value: 1 }],
    show: true,
  },
  { type: 'datetimerange', label: '处理时间', prop: 'handlerTime', require: true, show: true },
  {
    type: 'select',
    label: '办件类型',
    prop: 'type',
    require: true,
    placeholder: '请选择',
    options: [{ label: '单选一', value: 1 }],
    show: true,
  },
  {
    type: 'select',
    label: '事项性质',
    prop: 'itemProperty',
    require: true,
    options: [{ label: '单选一', value: 1 }],
    show: true,
  },
  {
    type: 'select',
    label: '事项名称',
    prop: 'itemName',
    require: true,
    options: [{ label: '单选一', value: 1 }],
    show: true,
  },
  {
    type: 'select',
    label: '办件状态',
    prop: 'itemStatus',
    require: true,
    options: [{ label: '单选一', value: 1 }],
    show: true,
  },
  {
    type: 'select',
    label: '满意度',
    prop: 'satisfaction',
    require: true,
    options: [{ label: '单选一', value: 1 }],
    show: true,
  },
]);

const ruleForm = ref({
  searchText: '',
  datetimerange: '',
  number: '',
  userType: '',
  username: '',
  bjjd: '',
  bjjz: '',
  department: '',
  handlerTime: '',
  type: '',
  itemProperty: '',
  itemName: '',
  itemStatus: '',
  satisfaction: '',
});

const functionList = ref({
  search: search,
});

const searchForm = ref();
function search(params: any) {
  ruleForm.value = params;
}
// 联动
// 父级数据
function getSelectData() {
  return [
    { label: '浙江省', value: 1 },
    { label: '江苏省', value: 2 },
    { label: '上海市', value: 3 },
  ];
}
interface optionsType {
  label: string;
  value: string;
}

// 父级改变

function selectChange(value: string, options: Array<optionsType>) {
  const obj = options.filter((option) => option.value == value)[0];
  console.log(obj);
  // @ts-ignore
  bjjdOptions.value = getBjjdOptions(value);
}
// 联动的数据

function getBjjdOptions(value: string | number) {
  if (value == '1') {
    return [
      { label: '杭州市', value: '101' },
      { label: '金华市', value: '102' },
      { label: '宁波市', value: '103' },
    ];
  } else if (value == '2') {
    return [
      { label: '南京市', value: '201' },
      { label: '无锡市', value: '202' },
      { label: '徐州市', value: '203' },
    ];
  } else if (value == '3') {
    return [
      { label: '徐汇区', value: '301' },
      { label: '静安区', value: '302' },
      { label: '浦东新区', value: '303' },
    ];
  } else {
    return [];
  }
}
function bjjdChange(value: string, options: Array<optionsType>) {
  console.log(value, options);
  const obj = options.filter((option) => option.value == value)[0];
  console.log(obj);
}
</script>

<style lang="scss" scoped></style>
