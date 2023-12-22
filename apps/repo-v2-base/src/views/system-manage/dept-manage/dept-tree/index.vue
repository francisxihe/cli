<template>
  <el-tree
    ref="deptTreeRef"
    :data="tree"
    node-key="id"
    :default-expanded-keys="expandedKeys"
    :props="{
      label: 'name',
      value: 'id',
    }"
    :expand-on-click-node="false"
    :highlight-current="true"
    @current-change="onCurrentChange"
  >
    <template #default="{ data }">
      <span class="custom-tree-node">
        <span>{{ data.name }}</span>
        <span>
          <i class="el-icon-plus" @click.stop="onClickNodeCreate(data)"></i>
          <i class="el-icon-delete" @click.stop="onClickNodeDelete(data)"></i>
        </span>
      </span>
    </template>
  </el-tree>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref } from 'vue';
import { SystemManage } from '@/api';

export default defineComponent({
  name: 'DeptTree',
  emits: ['change', 'delete', 'create'],
  props: {
    tree: {
      type: Array as PropType<SystemManage.Dept.TreeNode[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const deptTree = ref();
    const deptTreeRef = ref();
    const expandedKeys = computed(() => {
      return props.tree.map(item => item.id);
    });

    return {
      deptTreeRef,
      deptTree,
      expandedKeys,
      onCurrentChange: (data: SystemManage.Dept.TreeNode) => emit('change', data),
      onClickNodeCreate: (data: SystemManage.Dept.TreeNode) => emit('create', data),
      onClickNodeDelete: (data: SystemManage.Dept.TreeNode) => emit('delete', data),
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  font-size: 14px;
}
</style>
