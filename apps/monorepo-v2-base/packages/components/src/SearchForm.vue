<template>
  <!-- <el-form ref="searchRef" :inline="true" :model="searchForm" :label-position="'right'" label-width="auto"> -->
  <el-form ref="searchRef" :inline="true" :model="searchForm" :label-position="'right'">
    <el-row>
      <el-col v-for="(item, i) in configData" :key="i" :xs="12" :sm="12" :md="8" :lg="8" :xl="6">
        <el-form-item :label="item.label" :prop="item.field">
          <!-- 普通输入框 -->
          <el-input
            v-if="item.type == 'input'"
            v-model="searchForm[item.field]"
            :placeholder="item.placeholder ? item.placeholder : '请输入'"
          ></el-input>
          <!-- 下拉选择--选项是单一值 -->
          <el-select
            v-if="item.type == 'select'"
            v-model="searchForm[item.field]"
            :placeholder="item.placeholder ? item.placeholder : '请选择'"
          >
            <el-option v-for="(ele, j) in item.options" :key="j" :value="ele" :label="ele"></el-option>
          </el-select>
          <!--普通下拉选择框--选项拥有label和value不是同一值 -->
          <el-select
            v-if="item.type == 'ordinarySelect'"
            v-model="searchForm[item.field]"
            :placeholder="item.placeholder ? item.placeholder : '请选择'"
          >
            <el-option v-for="(ele, j) in item.options" :key="j" :value="ele.value" :label="ele.label"></el-option>
          </el-select>
          <!-- 时间日期选择 -->
          <el-date-picker
            v-if="item.type == 'datetime'"
            v-model="searchForm[item.field]"
            type="datetime"
            :value-format="item.valueFormatter"
            :placeholder="item.placeholder ? item.placeholder : '请选择'"
          >
          </el-date-picker>
          <!-- 时间范围选择 -->
          <el-date-picker
            v-if="item.type == 'datetimerange'"
            v-model="searchForm[item.field]"
            type="datetimerange"
            range-separator="~"
            :start-placeholder="item.placeholder && item.placeholder[0] ? item.placeholder[0] : '开始时间'"
            :end-placeholder="item.placeholder && item.placeholder[1] ? item.placeholder[1] : '结束时间'"
            :value-format="item.valueFormatter"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6">
        <el-form-item>
          <!-- <el-form-item> -->
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType } from 'vue';
const emits = defineEmits(['search']);
interface hylxItem {
  label: string;
  field: string;
  type: string;
  valueFormatter?: string;
  options?: any;
  placeholder?: any;
}
const props = defineProps({
  configData: {
    type: Array as PropType<hylxItem[]>,
    default: () => [],
  },
});
const searchRef = ref();

const getFields: any = () => {
  let searchForm = {};
  props.configData.forEach((item) => {
    searchForm[item.field] = '';
  });
  return searchForm;
};
let searchForm = reactive(getFields());
const handleSearch = () => {
  const searchParams = {};
  for (let i in searchForm) {
    if (searchForm[i] && searchForm[i].length !== 0) {
      searchParams[i] = searchForm[i];
    }
  }
  emits('search', searchParams);
};

const handleReset = () => {
  searchRef.value.resetFields();
  handleSearch();
};
const getSearchForm = () => {
  const searchParams = {};
  for (let i in searchForm) {
    if (searchForm[i] && searchForm[i].length !== 0) {
      searchParams[i] = searchForm[i];
    }
  }
  return searchParams;
};
defineExpose({
  getSearchForm,
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item__content) {
  margin-right: 24px;
}

:deep(.el-input__inner) {
  // width:270px
  width: auto;
}

:deep(.el-range-editor) {
  // width:270px
  max-width: 270px;
}
</style>
