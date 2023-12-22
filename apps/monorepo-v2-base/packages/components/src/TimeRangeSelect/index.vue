<template>
  <div :class="`${pf}__container`">
    <el-tag v-for="(option, index) in options" :key="index">{{ option }}</el-tag>
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
const pf = 'time-range-select';

interface Props {
  options?: Array<{ label: string; value: string | number }>;
}
const _props = withDefaults(defineProps<Props>(), {});
const date = ref<string[]>([]);
</script>

<style lang="scss" scoped>
$pf: time-range-select;

.#{$pf} {
  &__container {
    display: inline-flex;
    display: inline-flexbox;
    display: inline-flex;
  }
}
</style>
