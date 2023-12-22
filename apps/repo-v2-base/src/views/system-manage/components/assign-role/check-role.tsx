import { cloneDeep } from 'lodash';
import { Ref, ref, watch } from 'vue';
import { SystemManage } from '@/api';

export function useCheckRoleList() {
  /** 当前选中的部门id */
  const activedDeptId: Ref<number | undefined> = ref();
  /** 右侧待选择角色列表 */
  const roleList: Ref<SystemManage.Role.PageItem[]> = ref([]);
  /** 底部所有选择的角色 */
  const checkedRoleList: Ref<SystemManage.Role.PageItem[]> = ref([]);
  /** 右侧已选择的角色 */
  const currentCheckedRoleIdList: Ref<number[]> = ref([]);
  let oldCheckedRoleIdList: number[] = [];

  /** 删除底部选择的角色 */
  const onCloseCheckedRole = (role: SystemManage.Role.PageItem) => {
    const index = checkedRoleList.value.findIndex(checkedRole => checkedRole.id === role.id);

    if (index >= 0) {
      checkedRoleList.value.splice(index, 1);
    }
    const _index = currentCheckedRoleIdList.value.findIndex(id => id === role.id);
    if (_index >= 0) {
      currentCheckedRoleIdList.value.splice(_index, 1);
    }
  };

  /** check右侧已选择的角色 */
  const onChangeCurrentChecked = (newValue: number[]) => {
    const remove = oldCheckedRoleIdList.filter(
      oldItem =>
        newValue.findIndex(newItem => {
          return newItem === oldItem;
        }) < 0,
    );
    const add = newValue.filter(
      newItem =>
        oldCheckedRoleIdList.findIndex(oldItem => {
          return newItem === oldItem;
        }) < 0,
    );
    if (remove.length > 0) {
      remove.forEach(item => {
        const index = checkedRoleList.value.findIndex(role => role.id === item);
        if (index >= 0) {
          checkedRoleList.value.splice(index, 1);
        }
      });
    }
    if (add.length > 0) {
      add.forEach(item => {
        const role = roleList.value.find(_role => _role.id === item);
        if (role) {
          const index = checkedRoleList.value.findIndex(checkedRole => checkedRole.id === role.id);

          if (index < 0) {
            checkedRoleList.value.push(role);
          }
        }
      });
    }

    oldCheckedRoleIdList = cloneDeep(newValue);
  };

  watch(activedDeptId, async () => {
    if (activedDeptId.value !== undefined) {
      const res = await SystemManage.getRoleListByDeptId(activedDeptId.value);
      roleList.value = res.data;
      currentCheckedRoleIdList.value = roleList.value
        .filter(item => checkedRoleList.value.findIndex(checked => checked.id === item.id) >= 0)
        .map(item => item.id);
      oldCheckedRoleIdList = cloneDeep(currentCheckedRoleIdList.value);
    }
  });
  return {
    activedDeptId,
    roleList,
    checkedRoleList,
    currentCheckedRoleIdList,
    onCloseCheckedRole,
    onChangeCurrentChecked,
  };
}
