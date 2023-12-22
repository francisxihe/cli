<template>
  <div>
    <el-table size="medium" :header-cell-style="{ background: '#FAFAFA' }" border :data="tableData">
      <el-table-column label="序号" type="index" width="60"></el-table-column>
      <el-table-column v-for="(item, i) in columns" :key="i" :prop="item.prop" :label="item.label">
      </el-table-column>
      <el-table-column v-if="operationArr.length" label="操作">
        <template #default="{ row }">
          <el-button v-for="(item, j) in operationArr" :key="j" :disabled="item.disabled" type="text" @click="item.callBack(row.id)">{{
            item.label
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
interface columnsItem {
  prop: string;
  label: string;
}
interface operationItem {
  label: string;
  callBack: any;
  disabled:boolean,
}
defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  operationArr: {
    type: Array as PropType<operationItem[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<columnsItem[]>,
    default: () => [],
  },
});
</script>
