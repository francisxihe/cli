import { is } from '@fl/utils';
import { defineStore } from 'pinia';
import { UserPermissionWeb, UserInfo } from '@/api/system/permission';

const initPermissionList = () => {
  const permissionList = localStorage.getItem('permissionList');
  if (is.string(permissionList)) {
    return JSON.parse(permissionList) as UserPermissionWeb[];
  }
  return [];
};
const initUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (is.string(userInfo)) {
    return JSON.parse(userInfo) as UserInfo;
  }
  return {
    id: 0,
    username: '',
  };
};

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: localStorage.getItem('token') || undefined,
    userInfo: initUserInfo(),
    permissionList: initPermissionList(),
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    setPermissionList(permissionList: UserPermissionWeb[]) {
      this.permissionList = permissionList;
      localStorage.setItem('permissionList', JSON.stringify(permissionList));
    },
  },
});
