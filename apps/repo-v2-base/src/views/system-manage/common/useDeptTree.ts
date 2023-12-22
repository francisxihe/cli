import { SystemManage } from '@/api';
import { Ref, onMounted, ref } from 'vue';

export function useDeptTree() {
  /** 部门树数据 */
  const deptTree: Ref<SystemManage.Dept.TreeNode[]> = ref([]);

  onMounted(async () => {
    const res = await SystemManage.getDeptTree();
    deptTree.value = res.data;
  });

  return {
    deptTree,
  };
}
