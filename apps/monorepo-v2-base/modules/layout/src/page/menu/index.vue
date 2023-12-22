<template>
  <section class="menu-box">
    <el-menu :default-active="activeIndex" router class="el-menu-list" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="m in getMenuList(centerRoutes)" :key="getPath(m)" :index="getPath(m)">
        {{ m.meta.title }}
      </el-menu-item>
    </el-menu>
    <div class="sub-menu-box">
      <sub-menus v-if="menuShow" :menu="menu" />
      <div style="flex: 1; background: #fff; padding: 10px">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router/composables';
import { centerRoutes } from '@/router';
import { getMenuList, getPath } from 'utils';
import SubMenus from './components/sub-menus';

const route = useRoute();
const menuShow = ref(false);
const menu = ref(getMenuList(centerRoutes).find((item: any) => getPath(item) === route.path));
const activeIndex = ref(route.path);

const handleSelect = (key: string) => {
  activeIndex.value = key;
  checkMenuShow();
};

const checkMenuShow = () => {
  getMenuList(centerRoutes).forEach((item: any) => {
    if (item.children.length > 1) {
      const fn = (ls: any) => {
        ls.children.forEach((child: any) => {
          if (getPath(child) === activeIndex.value) {
            menuShow.value = true;
            activeIndex.value = getPath(item);
            menu.value = item;
          }
          if (child.children.length > 1) {
            fn(child);
          }
        });
      };
      fn(item);
    } else {
      menuShow.value = false;
    }
  });
};

onMounted(() => {
  checkMenuShow();
});
</script>

<style lang="scss" scoped>
:deep(.el-submenu .el-menu-item) {
  min-width: 180px !important;
}

// FIX: 强制改变了 active 颜色。可优化
:deep(.el-menu-item.is-active) {
  color: #303133;
}

.el-menu-list {
  display: flex;
  justify-content: space-between;
}

.menu-box {
  width: 1200px;
  min-height: calc(100vh - 270px);

  .sub-menu-box {
    display: flex;
    min-height: calc(100vh - 331px);

    .el-menu {
      width: 180px;
    }
  }
}
</style>
