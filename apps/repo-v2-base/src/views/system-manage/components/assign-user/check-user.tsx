import { cloneDeep } from 'lodash';
import { Ref, ref, watch } from 'vue';
import { SystemManage } from '@/api';

export function useCheckUserList() {
  /** 当前选中的部门id */
  const activedDeptId: Ref<number | undefined> = ref();
  /** 右侧待选择用户列表 */
  const userList: Ref<SystemManage.User.PageItem[]> = ref([]);
  /** 底部所有选择的用户 */
  const checkedUserList: Ref<SystemManage.User.PageItem[]> = ref([]);
  /** 右侧已选择的用户 */
  const currentCheckedUserIdList: Ref<number[]> = ref([]);
  let oldCheckedUserIdList: number[] = [];

  /** 删除底部选择的用户 */
  const onCloseCheckedUser = (user: SystemManage.User.PageItem) => {
    const index = checkedUserList.value.findIndex(checkedUser => checkedUser.id === user.id);
    if (index >= 0) {
      checkedUserList.value.splice(index, 1);
    }
    const _index = currentCheckedUserIdList.value.findIndex(id => id === user.id);
    if (_index >= 0) {
      currentCheckedUserIdList.value.splice(_index, 1);
    }
  };

  /** check右侧已选择的用户 */
  const onChangeCurrentChecked = (newValue: number[]) => {
    const remove = oldCheckedUserIdList.filter(
      oldItem =>
        newValue.findIndex(newItem => {
          return newItem === oldItem;
        }) < 0,
    );
    const add = newValue.filter(
      newItem =>
        oldCheckedUserIdList.findIndex(oldItem => {
          return newItem === oldItem;
        }) < 0,
    );
    if (remove.length > 0) {
      remove.forEach(item => {
        const index = checkedUserList.value.findIndex(user => user.id === item);
        if (index >= 0) {
          checkedUserList.value.splice(index, 1);
        }
      });
    }
    if (add.length > 0) {
      add.forEach(item => {
        const user = userList.value.find(_user => _user.id === item);
        if (user) {
          const index = checkedUserList.value.findIndex(checkedUser => checkedUser.id === user.id);

          if (index < 0) {
            checkedUserList.value.push(user);
          }
        }
      });
    }

    oldCheckedUserIdList = cloneDeep(newValue);
  };

  watch(activedDeptId, async () => {
    if (activedDeptId.value !== undefined) {
      const res = await SystemManage.getUserListByDeptId(activedDeptId.value);
      userList.value = res.data;
      currentCheckedUserIdList.value = userList.value
        .filter(item => checkedUserList.value.findIndex(checked => checked.id === item.id) >= 0)
        .map(item => item.id);
      oldCheckedUserIdList = cloneDeep(currentCheckedUserIdList.value);
    }
  });
  return {
    activedDeptId,
    userList,
    checkedUserList,
    currentCheckedUserIdList,
    onCloseCheckedUser,
    onChangeCurrentChecked,
  };
}
