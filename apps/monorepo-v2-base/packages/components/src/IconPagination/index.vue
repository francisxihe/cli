<template>
  <div class="icon-pagination">
    <i class="el-icon-arrow-left btn" @click="prev"></i>
    <span>{{ current }}</span>
    <span> / </span>
    <span>{{ total }}</span>
    <i class="el-icon-arrow-right btn" @click="next"></i>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  total?: number;
}

const _props = withDefaults(defineProps<Props>(), {
  total: 0,
});
console.log(_props);
const emits = defineEmits(['change']);

const current = ref<number>(1);

const prev = () => {
  emits('change');
};
const next = () => {
  emits('change');
};
</script>

<style lang="scss" scoped>
.icon-pagination {
  display: inline-block;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 14px;
  }
}

.btn {
  cursor: pointer;
}
</style>
