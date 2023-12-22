import { defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    // 是否显示侧边栏
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
  }),
  getters: {
    // 侧边栏是否打开
    getSidebarStatus(state) {
      return state.sidebar.opened;
    },
  },
  actions: {
    // 切换侧边栏
    toggleSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
  },
});
