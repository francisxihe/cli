<template>
  <el-table
    stripe
    class="tableBox"
    size="mini"
    border
    :header-cell-style="{ background: '#FAFAFA' }"
    :data="tableData"
    :max-height="tableHeight ? tableHeight : ''"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-table>
</template>

<script lang="ts" setup>
defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  tableHeight: {
    type: String,
    default: '1000px',
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
  background: #212936;
}

:deep(.el-table__header-wrapper .cell) {
  font-size: 14px;
}

:deep(.el-table__fixed-right .cell) {
  font-size: 16px;
}

:deep(.el-table__body-wrapper .el-table__cell) {
  color: #666;
  font-size: 16px;
}

.thingBox {
  display: flex;
  justify-content: center;

  .thingClass {
    width: 58px;
    height: 28px;
    border-radius: 3px;
    text-align: center;
    padding: 2px 0;
    box-sizing: border-box;
  }
}

.doNumber {
  cursor: pointer;
  color: #235ada;
}
</style>
