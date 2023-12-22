<template>
  <div :class="`${pf}__container`">
    <div :class="`${pf}__header`">
      {{ props.title }}
    </div>
    <div :class="`${pf}__options`">
      <div
        v-for="item in props.options"
        :key="item[key]"
        :class="[`${pf}__options--item`, { active: current == item[value] }]"
        @click="nodeClick(item)"
      >
        {{ item[label] }}
      </div>
      <el-empty v-if="!(options && options.length)"></el-empty>

      <div :class="`${pf}__footer`">
        <icon-pagination :total="Math.ceil(props.options.length / 10)"></icon-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { computed, ref } from 'vue';
import IconPagination from '../IconPagination/index.vue';

interface Props {
  title?: string; // 标题
  modelValue?: string | number; // 选中绑定值，映射字段为key
  options?: Array<any>; // 选项列表
  prop?: { label: string; value: string; key: string }; // 选项结构映射字段
}
const pf = 'list-page-select';

const emit = defineEmits(['update:modelValue', 'change']);

const props = withDefaults(defineProps<Props>(), {
  title: '标题',
  modelValue: '',
  options: () => [
    { label: '莫迪老仙', value: 1, key: 1 },
    { label: '法力无边', value: 2, key: 2 },
  ],
});

// 选项列表映射字段
const label = computed(() => props.prop?.label || 'label');
const value = computed(() => props.prop?.value || 'value');
const key = computed(() => props.prop?.key || 'key');

const current = ref<string | number>('');

const nodeClick = (item: Record<string, unknown>) => {
  const seed = item[value.value];
  current.value = seed as string | number;
  emit('update:modelValue', seed);
  emit('change', seed);
};
</script>

<style lang="scss" scoped>
$pf: list-page-select;

@mixin item {
  line-height: 40px;
  text-align: center;
}
.#{$pf} {
  &__container {
    display: inline-block;
    width: 100%;
  }

  &__header {
    background-color: #d7d7d7;
    @include item;
  }

  &__options {
    .active {
      background-color: #f2f2f2;
    }

    &--item {
      cursor: pointer;
      @include item;
    }
  }

  &__footer {
    @include item;

    text-align: center;
  }
}
</style>
