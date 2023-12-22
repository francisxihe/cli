import { Ref, onMounted, ref } from 'vue';
import { Message, MessageBox } from 'element-ui';
import { SystemManage } from '@/api';

export function usePermissionTree() {
  /** 部门树数据 */
  const permissionTree: Ref<SystemManage.Permission.TreeNode[]> = ref([]);

  const refreshPermissionTree = async () => {
    const res = await SystemManage.getPermissionTree();
    permissionTree.value = res.data;
  };

  const handleNodeDelete = async (node: SystemManage.Permission.TreeNode) => {
    await MessageBox.confirm('是否确认删除此条信息?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });

    const res = await SystemManage.deletePermission(node.id);
    if (res.code === 200) {
      Message.success('删除成功!');
      await refreshPermissionTree();
    } else {
      Message.error(res.msg || '删除失败!');
    }
  };

  /** 处理新增node */
  const handleNodeCreate = async (node: SystemManage.Permission.TreeNode) => {
    const res = await SystemManage.getPermissionDetail(node.id);
    if (!res.data) {
      Message.error(res.msg || '获部信息失败');
      throw new Error(res.msg || '获部信息失败');
    }
    return res.data;
  };

  const handleNodeUpdate = async (node: SystemManage.Permission.TreeNode) => {
    const res = await SystemManage.getPermissionDetail(node.id);
    if (!res.data) {
      Message.error(res.msg || '获部信息失败');
      throw new Error(res.msg || '获部信息失败');
    }
    return res.data;
  };

  onMounted(async () => {
    await refreshPermissionTree();
  });

  return {
    permissionTree,
    refreshPermissionTree,
    handleNodeDelete,
    handleNodeCreate,
    handleNodeUpdate,
  };
}
