<template>
  <div>
    <el-tree
      ref="deptTreeRef"
      :current-node-key="value"
      :data="tree"
      node-key="id"
      :default-expanded-keys="expandedKeys"
      :props="{
        label: 'name',
        value: 'id',
      }"
      :expand-on-click-node="false"
      :highlight-current="true"
      @node-click="onClickDept"
      @current-change="onCurrentChangeDept"
    >
    </el-tree>
  </div>
</template>

<script lang="ts">
import { PropType, Ref, defineComponent, onMounted, ref } from 'vue';
import { SystemManage } from '@/api';

export default defineComponent({
  name: 'DeptTree',
  emits: ['update:value', 'change'],
  props: {
    value: {
      type: Number,
    },
    tree: {
      type: Array as PropType<SystemManage.Dept.TreeNode[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const deptTreeRef = ref();
    const expandedKeys: Ref<number[]> = ref([]);
    onMounted(async () => {
      const res = await SystemManage.getDeptTree();
      expandedKeys.value = res.data.map((item) => item.id);
    });

    const onClickDept = (data: SystemManage.Dept.TreeNode) => {
      if (props.value !== data.id) {
        emit('update:value', data.id);
        emit('change', data.id);
      } else {
        emit('update:value', undefined);
        emit('change', undefined);
        deptTreeRef.value.setCurrentKey();
      }
    };

    const onCurrentChangeDept = (data: SystemManage.Dept.TreeNode) => {
      console.log(data.id);
    };

    return {
      deptTreeRef,
      expandedKeys,
      onClickDept,
      onCurrentChangeDept,
    };
  },
});
</script>
