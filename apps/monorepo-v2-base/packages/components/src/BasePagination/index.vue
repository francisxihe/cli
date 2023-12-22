<template>
  <div :class="[`${pf}__container`, { inline: props.inline }]">
    <el-pagination
      :layout="layout"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      :background="$attrs.background || true"
      :page-sizes="pageSizes"
      v-bind="$attrs"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script lang="tsx" setup>
import { PageConfig } from 'type/src/components';
import { computed, ref } from 'vue';

interface Props {
  pageConfig?: PageConfig; // 初始化配置
  inline?: boolean; //是否为行内块元素
  pageSizes?: Array<number>; //同element
  layout?: string; // 布局参数同element
  autoScroll?: boolean;
  align?: string; // 对其方式inline时无效
}

const props = withDefaults(defineProps<Props>(), {
  inline: false,
  pageSizes: () => [10, 20, 30, 40],
  layout: 'prev, pager, next, sizes, jumper',
});
const total = computed(() => props.pageConfig?.total);

const propCurrentPage = ref<number>(1);
const propPageSize = ref<number>(10);
const currentPage = computed({
  get: () => props.pageConfig?.pageNumber || propCurrentPage.value,
  set: (val) => {
    propCurrentPage.value = val;
  },
});
const pageSize = computed({
  get: () => props.pageConfig?.pageSize || propPageSize.value,
  set: (val) => {
    propPageSize.value = val;
  },
});
const align = computed(() => props.align);

const emits = defineEmits(['current-change', 'size-change']);
const pf = 'base-pagination';

const handleCurrentChange = (val: number) => {
  emits('current-change', val);
};
const handleSizeChange = (val: number) => {
  emits('size-change', val);
};
</script>

<style lang="scss" scoped>
$pf: base-pagination;
$align: #{v-bind(align)};

.#{$pf} {
  &__container {
    display: block;
    margin: 20px 0;
    text-align: $align;

    &.inline {
      display: inline-block;
    }
  }
}
</style>
