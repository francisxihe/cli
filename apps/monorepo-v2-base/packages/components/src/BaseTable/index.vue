<template>
  <el-table v-bind="$attrs" v-on="$listeners">
    <template v-for="config in props.tableConfig">
      <BaseTableColumn v-bind="config" :key="config[$attrs.rowKey]"></BaseTableColumn>
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import BaseTableColumn from './BaseTableColumn.vue';
import { TableColumnConfig } from 'type/src/components';

interface Props {
  tableConfig?: Array<TableColumnConfig>;
  [key: string]: any;
}

const props = withDefaults(defineProps<Props>(), {});
</script>
