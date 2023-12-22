<template>
  <div>
    <el-table
      v-loading="loading"
      size="medium"
      :border="true"
      :header-cell-style="{ background: '#FAFAFA' }"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(cell, index) in columns">
        <el-table-column v-if="cell.prop == 'selection'" :key="index" type="selection" v-bind="cell"></el-table-column>
        <el-table-column
          v-else-if="cell.prop == 'index'"
          :key="index"
          :label="`${cell.label || '序号'} `"
          type="index"
          v-bind="cell"
          width="80"
        >
          <template #default="scope">{{
            props.currentPage.pageSize * (props.currentPage.pageNumber - 1) + scope.$index + 1
          }}</template>
        </el-table-column>
        <el-table-column
          v-else-if="!cell.slot"
          :key="index"
          :prop="cell.prop"
          :label="cell.label"
          v-bind="cell"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column v-else-if="cell.slot" :key="index" :prop="cell.prop" :label="cell.label" show-overflow-tooltip>
          <template #default="{ row, column, $index }">
            <slot :name="cell.slot" :data="{ row, column, $index }"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <approval-pagination
      v-if="showPagination"
      :current-page="props.currentPage"
      @paginationClick="paginationClick"
    ></approval-pagination>
  </div>
</template>

<script lang="ts" setup>
import ApprovalPagination from '../ApprovalPagination/index.vue';
import { PropType } from 'vue';

interface dataType {
  id: number | string;
  [params: string]: any;
}

interface CurrentPage {
  pageSize: number;
  pageNumber: number;
  total: number;
}

interface columnsType {
  prop?: string;
  label?: string;
  [params: string]: any;
}

let props = defineProps({
  showPagination: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Array as PropType<columnsType[]>,
    default: () => {
      return [];
    },
  },

  tableData: {
    type: Array,
    default: () => [],
  },
  currentPage: {
    type: Object as PropType<CurrentPage>,
    default: () => {
      return {
        pageNumber: 1,
        pageSize: 10,
        total: 0,
      };
    },
  },
  loading: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
});
const emits = defineEmits(['handlePageChange', 'selectionChange']);
const paginationClick = (page: any) => {
  emits('handlePageChange', page);
};
const handleSelectionChange = (rows: dataType[]) => {
  emits('selectionChange', rows);
};
</script>
