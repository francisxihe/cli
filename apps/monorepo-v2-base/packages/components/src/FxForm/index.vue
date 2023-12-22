<!--
 * @Author: shill shill@fline88.com
 * @Date: 2022-09-19 14:28:52
 * @LastEditors: shill
 * @LastEditTime: 2022-10-20 18:17:11
 * @FilePath: \hljga-items-pages\src\components\FxForm\index.vue
 * @Description: 
-->
<template>
  <div class="">
    <el-form
      ref="ruleFormRef"
      :model="modelRuleForm"
      :rules="rules"
      :label-width="defaultConfig.labelWidth"
      :label-position="defaultConfig.labelPosition"
      :size="defaultConfig.size"
    >
      <el-row>
        <el-col v-for="(item, index) in formItem" :key="index" v-bind="item.grid || girdConfig.grid">
          <el-form-item
            v-show="item.show && item.type.indexOf('hidden') == -1"
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth || defaultConfig.labelWidth"
          >
            <el-input
              v-if="item.type == 'text'"
              v-model="modelRuleForm[item.prop]"
              :disabled="item.disabled"
              :prefix-icon="item.prefixIcon"
              :suffix-icon="item.suffixIcon"
              :placeholder="item.placeholder || '请输入'"
            ></el-input>
            <el-input
              v-else-if="item.type == 'textarea'"
              v-model="modelRuleForm[item.prop]"
              :disabled="item.disabled"
              :placeholder="item.placeholder || '请输入'"
            ></el-input>
            <el-input
              v-else-if="item.type == 'password'"
              v-model="modelRuleForm[item.prop]"
              :disabled="item.disabled"
              :placeholder="item.placeholder || '请输入'"
              show-password
            ></el-input>

            <el-radio-group
              v-else-if="item.type == 'radio'"
              v-model="modelRuleForm[item.prop]"
              :disabled="item.disabled"
            >
              <el-radio v-for="(option, i) in item.options" :key="i" :label="option?.value">{{
                option?.label
              }}</el-radio>
            </el-radio-group>

            <el-checkbox-group
              v-else-if="item.type == 'checkbox'"
              v-model="modelRuleForm[item.prop]"
              :disabled="item.disabled"
            >
              <el-checkbox v-for="(option, i) in item.options" :key="i" :label="option?.value">{{
                option?.label
              }}</el-checkbox>
            </el-checkbox-group>

            <el-select
              v-else-if="item.type == 'select'"
              v-model="modelRuleForm[item.prop]"
              :placeholder="item.placeholder || '请选择'"
              @change="
                item.change
                  ? item.change(modelRuleForm[item.prop], item.options || formOptionsData[item.optionsData])
                  : null
              "
            >
              <template v-if="item.options">
                <el-option
                  v-for="(option, i) in item.options"
                  :key="i"
                  :data="option"
                  :label="option?.label"
                  :value="option?.value"
                ></el-option>
              </template>
              <template v-else>
                <el-option
                  v-for="(option, i) in formOptionsData[item.optionsData]"
                  :key="i"
                  :data="option"
                  :label="option?.label"
                  :value="option?.value"
                ></el-option>
              </template>
            </el-select>

            <el-switch v-else-if="item.type == 'switch'" v-model="modelRuleForm[item.prop]"></el-switch>
            <el-time-picker
              v-else-if="item.type == 'time'"
              v-model="modelRuleForm[item.prop]"
              type="time"
              style="width: 100%"
              :placeholder="item.placeholder || '请选择'"
            ></el-time-picker>

            <el-date-picker
              v-if="['date', 'daterange', 'datetimerange', 'datetime'].indexOf(item.type) !== -1"
              v-model="modelRuleForm[item.prop]"
              :type="item.type"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              style="width: 100%"
              @change="item.callback && item.callback(modelRuleForm[item.prop])"
            ></el-date-picker>
            <slot v-else :name="item.slot" :data="item"></slot>
          </el-form-item>
        </el-col>
        <slot name="formBtn" :data="girdConfig.grid"></slot>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, toRefs } from 'vue';
interface formItemType {
  label: string;
  show: boolean;
  prop: string;
  [propName: string]: any;
}
const props = defineProps({
  formItem: Array as PropType<formItemType[]>,
  rules: Object,
  ruleForm: Object,
  functionList: Object,
  formOptionsData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  girdConfig: {
    type: Object,
    default: () => {
      return {
        grid: {
          xs: 24,
          sm: 24,
          md: 24,
          lg: 24,
          xl: 24,
        },
        gutter: 20,
      };
    },
  },
  formItemConfig: {
    type: Object,
    default: () => {
      return {
        labelWidth: '140px',
        labelPosition: 'right',
        labelSuffix: '222',
        size: 'medium',
      };
    },
  },
  // 解除注释 build tsc-报错 找不到定义
  optionsData: Object,
});

const modelRuleForm = ref<any>({});
const defaultConfig = ref({
  labelWidth: '140px',
  labelPosition: 'right',
  labelSuffix: '222',
  size: 'medium',
});
defaultConfig.value = ref<any>({ ...defaultConfig, ...props.formItemConfig });

// @ts-ignore
modelRuleForm.value = toRefs(props.ruleForm);

const ruleFormRef = ref();
// @ts-ignore
function validateFrom(callback) {
  // @ts-ignore
  ruleFormRef?.value?.validate((valid) => {
    if (valid) {
      callback(modelRuleForm.value);
    } else {
      return false;
    }
  });
}
function resetForm() {
  ruleFormRef.value.resetFields();
}
function getFieldsValue() {
  return modelRuleForm.value;
}

// interface keyType {
//   [params: string]: string
// }
// function setFormData(){
//   let resultData  = ref<keyType>({});
//   const arrData:string[] = ['checkbox','datetimerange', 'daterange']
//   props?.formItem?.forEach((item: formItemType)=>{
//     if(arrData.includes(item.type)){
//       resultData.value[item.type] = item.default || []
//     }else if(item.type === 'switch'){
//       resultData.value[item.type] = item.default || false
//     }else{
//       resultData.value[item.type] = item.default || undefined
//     }
//   })
//   return resultData.value
// }

// 想让外面调用的方法，需要通过defineExpose导出
defineExpose({
  resetForm,
  validateFrom,
  getFieldsValue,
});
</script>
