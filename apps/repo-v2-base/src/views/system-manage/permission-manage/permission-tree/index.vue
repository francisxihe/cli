<template>
  <div>
    <el-tree
      ref="permissionTreeRef"
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
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ data.name }}</span>
          <span>
            <i class="el-icon-plus" @click.stop="onClickNodeCreate(data)"></i>
            <i class="el-icon-delete" @click.stop="onClickNodeDelete(data)"></i>
          </span>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref } from 'vue';
import { SystemManage } from '@/api';

export default defineComponent({
  name: 'PermissionTree',
  emits: ['change', 'delete', 'create'],
  props: {
    tree: {
      type: Array as PropType<SystemManage.Permission.TreeNode[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const permissionTree = ref();
    const permissionTreeRef = ref();
    const expandedKeys = computed(() => {
      return props.tree.map((item) => item.id);
    });

    return {
      permissionTreeRef,
      permissionTree,
      expandedKeys,
      onCurrentChange: (data: SystemManage.Permission.TreeNode) => emit('change', data),
      onClickNodeCreate: (data: SystemManage.Permission.TreeNode) => emit('create', data),
      onClickNodeDelete: (data: SystemManage.Permission.TreeNode) => emit('delete', data),
    };
  },
});
</script>

<style lang="scss" scoped>
.root {
  font-weight: bold;
}

.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  font-size: 14px;
}
</style>
