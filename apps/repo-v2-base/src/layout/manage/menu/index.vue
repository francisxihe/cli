<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="status"
    collapse-transition
    unique-opened
  >
    <basic-menus v-for="menu in menuTree" :key="menu.path" :menu="menu" />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { EPermissionType } from '@/api/system/permission/enum';
import { useUserStore } from '@/store/modules/user';
import BasicMenus from './components/BasicMenus';

export default defineComponent({
  components: { BasicMenus },
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const { permissionList } = userStore;
    const menuTree = ref();

    const formatMenuTree = (list: any) => {
      if (!list) return [];
      // 排序
      list.sort((a: any, b: any) => a.ordinal - b.ordinal);

      return list
        .map((item: any) => {
          return {
            ...item,
            children: formatMenuTree(item.children),
          };
        })
        .filter((item: any) => item.hidden !== 1);
    };

    const menuList = permissionList.filter(permission => permission.type === EPermissionType.菜单);

    for (let curLevel = 1; menuList.filter(menu => menu.level === curLevel).length > 0; curLevel++) {
      menuList
        .filter(menu => menu.level === curLevel)
        .forEach(menu => {
          menu.children = menuList.filter(
            childAuth => childAuth.level === curLevel + 1 && childAuth.parentName === menu.name,
          );
        });
    }

    menuTree.value = formatMenuTree(menuList.filter(menu => menu.level === 1));

    console.log(menuTree.value);
    return {
      menuTree,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-submenu__title) {
  height: 50px;
  margin: 0;
  line-height: 50px;
}

:deep(.el-submenu__title:hover) {
  background: rgb(48 120 255 / 10%);
  border-radius: 4px;
}

:deep(.el-submenu .el-menu-item) {
  min-width: 180px;
  height: 45px;
  margin-bottom: 4px;
  padding: 0 45px;
  line-height: 45px;
  border-radius: 6px;
}

:deep(.el-submenu__title i) {
  // color: #fff;
  font-size: 14px;
}

:deep(.el-menu-item) {
  height: 50px;
  margin: 0;
  line-height: 50px;
}

:deep(.el-menu-item .title-icon) {
  display: inline-block !important;
  width: 8px !important;
  height: 8px !important;
  margin-right: 8px;
  border: 1px solid #e1e2e6 !important;
  border-radius: 50% !important;
}

:deep(.el-menu-item:hover) {
  margin-right: 8px !important;
  margin-left: 14px !important;
  background: rgb(48 120 255 / 10%) !important;
  border-radius: 4px;

  .title-icon {
    background: #3078ff !important;
  }
}

:deep(.el-menu-item.is-active) {
  margin-right: 8px !important;
  margin-left: 14px !important;
  color: #015fec;
  font-weight: 600;
  background: rgb(48 120 255 / 10%) !important;
  border-radius: 4px;

  .title-icon {
    background: #3078ff !important;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
}

.el-menu {
  z-index: 2;
  border: none;
  cursor: pointer;
}
</style>
@/api/systemManage/permission/enum @/pinia/modules/user@/pinia/modules/user
