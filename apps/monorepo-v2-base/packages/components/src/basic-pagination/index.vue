<template>
  <div class="paging">
    <div>共 {{ currentPage.total }} 条</div>
    <el-pagination
      :current-page="currentPage.pageNumber"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="currentPage.pageSize"
      layout="prev, pager, next, sizes, jumper"
      :total="currentPage.total"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
type CurrentPage = {
  pageNumber: number;
  pageSize: number;
  total: number;
};

defineProps({
  currentPage: {
    type: Object as PropType<CurrentPage>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.paging {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
