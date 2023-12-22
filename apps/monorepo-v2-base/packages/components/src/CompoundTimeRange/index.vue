<template>
  <div :class="`${pf}__container`">
    <el-radio-group v-model="selected" :class="`${pf}__button`" size="mini">
      <el-radio-button v-for="(item, index) in options" :key="index" :label="item.key">{{
        item.label
      }}</el-radio-button>
    </el-radio-group>

    <el-date-picker
      v-bind="$attrs"
      v-model="picked"
      :type="$attrs.type || 'daterange'"
      :range-separator="$attrs.rangeSeparator || '至'"
      :start-placeholder="$attrs.startPlaceholder || '开始日期'"
      :end-placeholder="$attrs.endPlaceholder || '结束日期'"
      :value-format="$attrs.valueFormat || 'yyyy-MM-DD HH:mm:ss'"
      @change="pickerChange"
    >
    </el-date-picker>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
const pf = 'time-range';

interface Props {
  options?: Array<{ label: string; value: string; key: number | string }>;
}

const _props = withDefaults(defineProps<Props>(), {
  options: () => [
    { label: '今日', value: '1', key: 1 },
    { label: '本周', value: '2', key: 2 },
    { label: '本月', value: '3', key: 3 },
    { label: '全年', value: '4', key: 4 },
  ],
});

const _emit = defineEmits(['change']);

const selected = ref<string>();
const picked = ref<string>();

function pickerChange() {
  selected.value = '';
}
</script>

<style lang="scss" scoped>
$pf: time-range;

.#{$pf} {
  &__container {
    ::v-deep(.el-radio-button:first-child .el-radio-button__inner) {
      border: none;
    }

    ::v-deep(.el-radio-button__inner) {
      border: none;
    }

    ::v-deep(.el-radio-button:last-child .el-radio-button__inner) {
      border-radius: 0;
    }

    ::v-deep(.el-radio-button:first-child .el-radio-button__inner) {
      border-radius: 0;
    }
  }

  &__button {
    margin-right: 10px;
  }
}
</style>
