<template>
  <div class="dept-manage">
    <div class="left">
      <dept-tree
        :tree="deptTree"
        @change="onClickNodeUpdate"
        @delete="onClickNodeDelete"
        @create="onClickNodeCreate"
      ></dept-tree>
    </div>
    <div class="main">
      <dept-editor
        v-if="formEditorCtr.data"
        :mode="formEditorCtr.mode"
        :data="formEditorCtr.data"
        @confirm="onConfirmDeptEditor"
        @cancel="onCancelDeptEditor"
      ></dept-editor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SystemManage } from '@/api';
import DeptEditor from './dept-editor/index.vue';
import DeptTree from './dept-tree/index.vue';
import { useDeptTree } from './dept-tree/use';
import { ECommonEditorMode } from '../type';
import { useDeptEditor } from './dept-editor/use';

export default defineComponent({
  components: {
    DeptTree,
    DeptEditor,
  },
  setup() {
    const currentDeptId = ref();

    const { formEditorCtr, resetFormEditorCtr, completeInitData } = useDeptEditor();

    const assignUserData = ref();

    const { deptTree, refreshDeptTree, handleNodeDelete, handleNodeCreate, handleNodeUpdate } = useDeptTree();

    const onClickNodeDelete = async (node: SystemManage.Dept.TreeNode) => {
      await handleNodeDelete(node);
      if (node.id === currentDeptId.value) {
        resetFormEditorCtr();
      }
    };

    const onClickNodeCreate = async (node: SystemManage.Dept.TreeNode) => {
      const res = await handleNodeCreate(node);
      formEditorCtr.value = {
        mode: ECommonEditorMode.Create,
        data: completeInitData({
          parentId: res.id,
        }),
      };
    };

    const onClickNodeUpdate = async (node: SystemManage.Dept.TreeNode) => {
      currentDeptId.value = node.id;
      formEditorCtr.value = {
        mode: ECommonEditorMode.Update,
        data: await handleNodeUpdate(node),
      };
    };

    const onConfirmDeptEditor = () => {
      resetFormEditorCtr();
      refreshDeptTree();
    };
    return {
      deptTree,
      currentDeptId,
      formEditorCtr,
      assignUserData,
      refreshDeptTree,
      onClickNodeDelete,
      onClickNodeCreate,
      onClickNodeUpdate,
      /** 确认DeptEditor */
      onConfirmDeptEditor,
      onCancelDeptEditor: () => resetFormEditorCtr(),
    };
  },
});
</script>

<style lang="scss" scoped>
.dept-manage {
  display: flex;
  min-height: 100%;
}

.left {
  width: 300px;
  min-height: 100%;
  margin-right: 12px;
  padding: 12px;
  background-color: white;
}

.main {
  flex-shrink: 1;
  width: 100%;
  min-height: 100%;
  padding: 12px;
  background-color: white;
}
</style>
