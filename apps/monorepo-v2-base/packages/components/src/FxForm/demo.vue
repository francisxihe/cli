<!--
 * @Author: shill shill@fline88.com
 * @Date: 2022-09-29 09:45:38
 * @LastEditors: shill
 * @LastEditTime: 2022-10-13 17:01:44
 * @FilePath: \hljga-items-pages\src\components\FxForm\demo.vue
 * @Description: 
-->

<template>
  <div>
    <h1>form表单模板</h1>
    <fx-form ref="addForm" :form-item="formItem" :rules="rules" :rule-form="ruleForm" :gird-config="girdConfig">
    </fx-form>
    <div class="">
      <el-button size="small" @click="handlerCancle">取 消</el-button>
      <el-button size="small" type="primary" @click="addFormSubmit">确定</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import fxForm from './index.vue';

import { ref } from 'vue';
const girdConfig = ref({
  grid: {
    xxs: 12,
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
    xxl: 12,
  },
});
const formItem = ref([
  { type: 'text', label: '输入框', prop: 'text', require: true, show: true },
  {
    type: 'textarea',
    label: 'textarea文本',
    prop: 'textarea',
    require: true,
    placeholder: '请选择',
    labelWidth: '200px',
    show: true,
  },
  { type: 'password', label: '密码框', prop: 'password', require: true, placeholder: '请选择', show: true },
  {
    type: 'radio',
    label: '单选',
    prop: 'radio',
    require: true,
    placeholder: '请选择',
    options: [
      { label: '单选一', value: 1 },
      { label: '单选二', value: 2 },
      { label: '单选三', value: 3 },
    ],
    show: true,
  },
  {
    type: 'checkbox',
    label: '多选',
    prop: 'checkbox',
    require: true,
    placeholder: '请选择',
    options: [
      { label: '多选一', value: 1 },
      { label: '多选二', value: 2 },
      { label: '多选三', value: 3 },
    ],
    show: true,
  },
  {
    type: 'select',
    label: '下拉框',
    prop: 'select',
    require: true,
    placeholder: '请选择',
    options: [
      { label: '选项一', value: 1 },
      { label: '选项二', value: 2 },
      { label: '选项三', value: 3 },
    ],
    show: true,
  },
  { type: 'switch', label: '开关', prop: 'switch', require: true, placeholder: '请选择', show: true },
  { type: 'time', label: '时分秒', prop: 'time', require: true, placeholder: '请选择', show: true },
  { type: 'date', label: '日期', prop: 'date', require: true, placeholder: '请选择', show: true },
  { type: 'datetime', label: '年月日时分秒', prop: 'datetime', require: true, placeholder: '请选择', show: true },
  { type: 'datetimerange', label: '日期区间', prop: 'datetimerange', require: true, placeholder: '请选择', show: true },
]);

const ruleForm = ref({
  text: '',
  textarea: '',
  password: '',
  radio: '',
  select: '',
  checkbox: [],
  switch: '',
  time: '',
  date: '',
  datetime: '',
  datetimerange: '',
});

const rules = ref({
  text: [
    { required: true, message: '请输入活动', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  textarea: [{ required: true, message: '请选择', trigger: 'change' }],
  password: [{ required: true, message: '请选择', trigger: 'change' }],
  radio: [{ required: true, message: '请选择', trigger: 'change' }],
  select: [{ required: true, message: '请选择', trigger: 'change' }],
  checkbox: [{ required: true, message: '请选择', trigger: 'change' }],
  switch: [{ required: true, message: '请选择', trigger: 'blur' }],
  time: [{ required: true, message: '请选择', trigger: 'blur' }],
  date: [{ required: true, message: '请选择', trigger: 'blur' }],
  datetime: [{ required: true, message: '请选择', trigger: 'blur' }],
  datetimerange: [{ required: true, message: '请选择', trigger: 'blur' }],
});

const addForm = ref();
function handlerCancle() {
  addForm.value.resetForm();
}
//
function addFormSubmit() {
  addForm.value.validateFrom((values: any) => {
    console.log('返回的数据=', values);
  });
}
</script>

<style lang="scss" scoped></style>
