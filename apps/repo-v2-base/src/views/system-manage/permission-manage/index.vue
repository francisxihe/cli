<template>
  <div class="permission-manage">
    <div class="left">
      <permission-tree
        :tree="permissionTree"
        @change="onClickNodeUpdate"
        @delete="onClickNodeDelete"
        @create="onClickNodeCreate"
      ></permission-tree>
    </div>
    <div class="main">
      <permission-editor
        v-if="formEditorCtr.data"
        :mode="formEditorCtr.mode"
        :data="formEditorCtr.data"
        @confirm="onConfirmPermissionEditor"
        @cancel="onCancelPermissionEditor"
      ></permission-editor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { formatDatetime } from '@fl/utils';
import { SystemManage } from '@/api';
import PermissionEditor from './permission-editor/index.vue';
import PermissionTree from './permission-tree/index.vue';
import { usePermissionTree } from './permission-tree/use';
import { usePermissionEditor } from './permission-editor/use';
import { ECommonEditorMode } from '../type';

export default defineComponent({
  components: {
    PermissionEditor,
    PermissionTree,
  },
  setup(props) {
    const currentDeptId = ref();

    const { formEditorCtr, resetFormEditorCtr, completePermissionData } = usePermissionEditor();
    const { permissionTree, refreshPermissionTree, handleNodeDelete, handleNodeCreate, handleNodeUpdate } =
      usePermissionTree();

    const onConfirmPermissionEditor = () => {
      resetFormEditorCtr();
      refreshPermissionTree();
    };

    const onClickNodeDelete = async (node: SystemManage.Permission.TreeNode) => {
      await handleNodeDelete(node);
      if (node.id === currentDeptId.value) {
        resetFormEditorCtr();
      }
    };

    const onClickNodeCreate = async (node: SystemManage.Permission.TreeNode) => {
      const res = await handleNodeCreate(node);

      formEditorCtr.value = {
        mode: ECommonEditorMode.Create,
        data: completePermissionData({
          location: res.location,
          parentId: res.id,
        }),
      };
    };

    const onClickNodeUpdate = async (node: SystemManage.Permission.TreeNode) => {
      currentDeptId.value = node.id;
      const res = await handleNodeUpdate(node);
      formEditorCtr.value = {
        mode: ECommonEditorMode.Update,
        data: res,
      };
    };

    onMounted(() => {});

    return {
      formEditorCtr,
      permissionTree,
      onClickNodeDelete,
      onClickNodeCreate,
      onClickNodeUpdate,
      onCancelPermissionEditor: () => resetFormEditorCtr(),
      /** 确认PermissionEditor */
      onConfirmPermissionEditor,
      /** 时间格式转换 */
      formatDate: (datetime: string) => formatDatetime(datetime, 'yyyy-MM-dd'),
    };
  },
});
</script>

<style lang="scss" scoped>
.permission-manage {
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
