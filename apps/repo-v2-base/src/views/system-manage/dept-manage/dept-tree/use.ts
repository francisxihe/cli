import { Ref, onMounted, ref } from 'vue';
import { Message, MessageBox } from 'element-ui';
import { SystemManage } from '@/api';

export function useDeptTree() {
  /** 部门树数据 */
  const deptTree: Ref<SystemManage.Dept.TreeNode[]> = ref([]);

  const refreshDeptTree = async () => {
    const res = await SystemManage.getDeptTree();
    deptTree.value = res.data;
  };

  const handleNodeDelete = async (node: SystemManage.Dept.TreeNode) => {
    await MessageBox.confirm('是否确认删除此条信息?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });

    const res = await SystemManage.deleteDept(node.id);

    if (res.code === 200) {
      Message.success('删除成功!');
      refreshDeptTree();
    } else {
      Message.error(res.msg || '删除失败!');
      throw new Error(res.msg);
    }
  };

  const handleNodeCreate = async (node: SystemManage.Dept.TreeNode) => {
    const res = await SystemManage.getDeptDetail(node.id);
    if (!res.data) {
      Message.error(res.msg || '获部信息失败');
      throw new Error(res.msg || '获部信息失败');
    }
    return res.data;
  };

  const handleNodeUpdate = async (node: SystemManage.Dept.TreeNode) => {
    const res = await SystemManage.getDeptDetail(node.id);
    if (!res.data) {
      Message.error(res.msg || '获部信息失败');
      throw new Error(res.msg || '获部信息失败');
    }
    return res.data;
  };

  onMounted(async () => {
    await refreshDeptTree();
  });

  return {
    deptTree,
    refreshDeptTree,
    handleNodeDelete,
    handleNodeCreate,
    handleNodeUpdate,
  };
}
