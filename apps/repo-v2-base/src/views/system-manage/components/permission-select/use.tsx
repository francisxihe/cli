import { Ref, onMounted, ref } from 'vue';
import { SystemManage } from '@/api';

export function usePermissionSelect() {
  /** 部门树数据 */
  const permissionTree: Ref<SystemManage.Permission.TreeNode[]> = ref([]);

  onMounted(async () => {
    const res = await SystemManage.getPermissionTree();
    permissionTree.value = res.data;
  });

  return {
    permissionTree,
  };
}
