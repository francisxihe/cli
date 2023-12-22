<template>
  <el-cascader
    v-model="permissionValue"
    :options="tree"
    :props="{
      label: 'name',
      checkStrictly: true,
      value: 'id',
    }"
    clearable
  >
  </el-cascader>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import { SystemManage } from '@/api';
import { renderNodePath } from '../../common/renderNodePath';

export default defineComponent({
  props: {
    value: {
      type: Number,
    },
    tree: {
      type: Array as PropType<SystemManage.Permission.TreeNode[]>,
      required: true,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    /** 部门对应展示数据 ，parentId不包含路径信息，需要做一层处理 */
    const permissionValue = computed({
      get() {
        if (!props.value) {
          return [];
        }
        return renderNodePath(props.tree, [], props.value) || [];
      },
      set(value) {
        if (value.length === 0) {
          emit('update:value', undefined);
        } else {
          emit('update:value', value[value.length - 1]);
        }
      },
    });

    return {
      permissionValue,
    };
  },
});
</script>
