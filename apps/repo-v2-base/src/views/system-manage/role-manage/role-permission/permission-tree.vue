<template>
  <div>
    <el-tree
      ref="permissionTreeRef"
      :data="permissionTree"
      node-key="id"
      :default-expanded-keys="expandedKeys"
      :props="{
        label: 'name',
        value: 'id',
      }"
      :expand-on-click-node="false"
      check-strictly
      show-checkbox
      @check-change="onCheckedChange"
    >
    </el-tree>
  </div>
</template>

<script lang="ts">
import { PropType, Ref, defineComponent, onMounted, ref, toRef, watch } from 'vue';
import { SystemManage } from '@/api';

export default defineComponent({
  name: 'PermissionTree',
  emits: ['update:checkedKeys', 'change'],
  props: {
    checkedKeys: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const permissionTree = ref();
    const permissionTreeRef = ref();
    const expandedKeys: Ref<number[]> = ref([]);

    const getCheckedNodes = () => {
      return permissionTreeRef.value.getCheckedNodes();
    };

    const onCheckedChange = (data: SystemManage.Permission.TreeNode, checked: boolean, indeterminate: boolean) => {
      const { checkedKeys } = props;

      if (checked) {
        checkedKeys.push(data.id);
      } else {
        const index = checkedKeys.findIndex((item) => item === data.id);

        if (index >= 0) {
          checkedKeys.splice(index, 1);
        }
      }
      emit('update:checkedKeys', permissionTreeRef.value.getCheckedKeys());
    };

    watch(toRef(props, 'checkedKeys'), (value) => {
      permissionTreeRef.value.setCheckedKeys(value);
    });

    onMounted(async () => {
      const res = await SystemManage.getPermissionTree();
      permissionTree.value = res.data;
      expandedKeys.value = res.data.map((item) => item.id);
    });

    return {
      permissionTreeRef,
      permissionTree,
      expandedKeys,
      onCheckedChange,
      getCheckedNodes,
    };
  },
});
</script>
