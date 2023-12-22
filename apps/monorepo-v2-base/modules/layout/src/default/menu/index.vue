<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="status"
    background-color="#2d2d2d"
    text-color="#fff"
    collapse-transition
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
  >
    <basic-menus v-for="menu in getMenuList(asyncRoutes)" :key="menu.path" :menu="menu" />
  </el-menu>
</template>

<script setup lang="ts">
import { getMenuList } from 'utils';
import BasicMenus from './components/basic-menus';

defineProps({
  status: {
    type: Boolean,
    default: false,
  },
});

const handleOpen = () => {
  console.log('open');
};
const handleClose = () => {
  console.log('close');
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
}

.el-menu {
  border: none;
}
</style>
