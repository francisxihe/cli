<template>
  <!-- cheat vue-tsc -->
  <el-dialog :visible.sync="visible" destroy-on-close modal-append-to-body v-bind="$attrs" v-on="$listeners">
    <template v-if="$slots.title" #title>
      <slot name="title"></slot>
    </template>

    <template v-else #title>
      <span>标题</span>
    </template>

    <template v-if="$slots.default" #default>
      <slot></slot>
    </template>

    <template v-else #default>
      <div>内容</div>
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>

    <template v-else #footer>
      <div :class="`${pf}__footer`">
        <el-button @click="buttonCancel">取消</el-button>
        <el-button type="primary" @click="buttonConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';

import { computed } from 'vue';

/**
 * @slots it has three slots, default, title, footer
 * @props as same as element-ui's el-dialog
 */
const pf = 'base-dialog';

// const visible = ref<boolean>(false);
interface Props {
  show?: boolean;
}
const _props = defineProps<Props>();

const emits = defineEmits(['cancel', 'confirm', 'update:show']);
// 保证单项数据流用computed做一次缓存
const visible = computed({
  get: () => {
    return _props.show;
  },
  set: (val) => {
    //
    emits('update:show', val);
  },
});

const resolve = () => {
  emits('update:show', true);
};

const buttonCancel = () => {
  emits('cancel', { resolve });
};
const buttonConfirm = () => {
  emits('confirm', { resolve });
};
</script>

<style lang="scss" scoped>
$pf: base-dialog;

.#{pf} {
  &__footer {
    text-align: right;
  }
}
</style>
