<template>
  <el-tree
    ref="deptTreeRef"
    :data="deptTree"
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
</template>

<script lang="ts">
import { PropType, Ref, defineComponent, onMounted, ref, toRef, watch } from 'vue';
import { SystemManage } from '@/api';

export default defineComponent({
  name: 'DeptTree',
  emits: ['update:checkedKeys', 'change'],
  props: {
    checkedKeys: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const deptTree = ref();
    const deptTreeRef = ref();
    const expandedKeys: Ref<number[]> = ref([]);

    const getCheckedNodes = () => {
      return deptTreeRef.value.getCheckedNodes();
    };

    const onCheckedChange = (data: SystemManage.Dept.TreeNode, checked: boolean, indeterminate: boolean) => {
      const { checkedKeys } = props;

      if (checked) {
        checkedKeys.push(data.id);
      } else {
        const index = checkedKeys.findIndex(item => item === data.id);

        if (index >= 0) {
          checkedKeys.splice(index, 1);
        }
      }
      emit('update:checkedKeys', deptTreeRef.value.getCheckedKeys());
    };

    watch(toRef(props, 'checkedKeys'), value => {
      deptTreeRef.value.setCheckedKeys(value);
    });

    onMounted(async () => {
      const res = await SystemManage.getDeptTree();
      deptTree.value = res.data;
      expandedKeys.value = res.data.map(item => item.id);
    });

    return {
      deptTreeRef,
      deptTree,
      expandedKeys,
      onCheckedChange,
      getCheckedNodes,
    };
  },
});
</script>
