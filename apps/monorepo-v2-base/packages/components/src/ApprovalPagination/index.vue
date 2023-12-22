<!--
 * @Author: shill shill@fline88.com
 * @Date: 2022-09-28 14:05:54
 * @LastEditors: shill
 * @LastEditTime: 2022-10-20 15:23:50
 * @FilePath: \hljga-items-pages\src\components\ApprovalPagination\index.vue
 * @Description: 
-->
<template>
  <div class="paging">
    <div>共 {{ page.total }} 条记录</div>
    <el-pagination
      background
      :current-page="page.pageNumber"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pageSize"
      layout="prev, pager, next, sizes, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, watchEffect } from 'vue';
// import { ref } from 'vue';
type CurrentPage = {
  pageSize: number;
  pageNumber: number;
  total: number;
};

// type Progress = {
//   key: string;
//   backgroundColor: string;
//   color: string;
// };

const props = defineProps({
  currentPage: {
    type: Object as PropType<CurrentPage>,
    required: true,
  },
});

const page = ref({ ...props.currentPage });
watchEffect(() => {
  page.value = { ...props.currentPage };
});

const emits = defineEmits(['paginationClick']);

const handleSizeChange = (val: any) => {
  page.value.pageSize = val;
  page.value.pageNumber = 1;
  emits('paginationClick', page.value);
};
const handleCurrentChange = (val: any) => {
  page.value.pageNumber = val;
  emits('paginationClick', page.value);
};
</script>

<style lang="scss" scoped>
.paging {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
