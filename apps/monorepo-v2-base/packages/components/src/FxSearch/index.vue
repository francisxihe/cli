<template>
  <div>
    <fx-form
      ref="searchForm"
      :form-item="formItem"
      :rules="rules"
      :rule-form="ruleForm"
      :gird-config="searchGridConfig"
      :form-item-config="formItemConfig"
      :form-options-data="formOptionsData"
    >
      <!-- <el-col slot="formBtn" v-bind="searchGrigUsed" class="text-right"> -->
      <el-col slot="formBtn" v-bind="searchGrigUsed" class="text-right">
        <el-button type="primary" icon="el-icon-search" @click="search"> 查询 </el-button>
        <el-button type="default" icon="el-icon-search" @click="reset('reset')"> 重置 </el-button>
        <template v-if="toggleCollapse">
          <a v-if="props?.formItem?.length > count" href="javascript:;" @click="toggleCollapsed">
            {{ formToggle ? '收起' : '展开' }}<i :class="`el-icon-arrow-${formToggle ? 'up' : 'down'}`"></i>
          </a>
        </template>
      </el-col>
    </fx-form>
  </div>
</template>

<script setup lang="ts">
import fxForm from '../FxForm/index.vue';
import { ref, PropType, onMounted } from 'vue';

interface formItemType {
  label: string;
  show: boolean;
  prop: string;
  [propName: string]: any;
}
const props = defineProps({
  formItem: {
    type: Array as PropType<formItemType[]>,
    require: true,
    default: () => {
      return [];
    },
  },
  rules: Object,
  ruleForm: Object,
  functionList: Object,
  formOptionsData: Object,
  searchConfig: {
    type: Object,
    default: () => {
      return {
        xs: { span: 12, offset: 0 },
        sm: { span: 12, offset: 0 },
        md: { span: 12, offset: 0 },
        lg: { span: 8, offset: 0 },
        xl: { span: 6, offset: 0 },
      };
    },
  },
  optionsData: Object,
  formItemConfig: Object,
  toggleCollapse: {
    type: Boolean,
    default: true,
  },
  searchGridConfig: {
    type: Object,
    default: () => {
      return {
        grid: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6,
        },
      };
    },
  },
});

// let searchGridConfig = reactive({
//   grid: {
//     xs: 12,
//     sm: 12,
//     md: 12,
//     lg: 8,
//     xl: 6,
//   },
// });

const searchForm = ref();
const searchGrigUsed = ref<any>({});

onMounted(() => {
  searchGrigUsed.value = { ...searchGrigUsed.value, ...props.searchConfig };
  initSearch();
});

function initSearch() {
  if (Object.keys(searchGrigUsed.value).length == 0) {
    return;
  }
  searchGrigUsed.value.xl.offset = computedSpan(searchGrigUsed.value.xl.span);
  searchGrigUsed.value.lg.offset = computedSpan(searchGrigUsed.value.lg.span);
  searchGrigUsed.value.md.offset = computedSpan(searchGrigUsed.value.md.span);
}
function computedSpan(span: number) {
  const formLength: any = props.formItem?.filter(
    (item) => item?.type != 'hidden' && item?.type != 'hiddenNumber',
  ).length;
  return (24 / span - (formLength % (24 / span)) - 1) * span;
}
function search(type: string) {
  const formValues = getFieldsValue();
  props.functionList?.search(formValues, type);
}
function getFieldsValue() {
  return searchForm?.value?.getFieldsValue();
}
function reset(type: string) {
  searchForm?.value?.resetForm();
  props.functionList?.search(getFieldsValue(), type);
}
const count = 3;
const formToggle = ref(false);
function toggleCollapsed() {
  formToggle.value = !formToggle.value;
}
</script>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}

:deep(.el-select) {
  width: 100%;
}
</style>
