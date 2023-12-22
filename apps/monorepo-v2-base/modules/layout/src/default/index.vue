<template>
  <el-container>
    <el-aside :width="menuStatus ? '64px' : '210px'" class="sidebar-container">
      <Logo :status="menuStatus" />
      <Menu :status="menuStatus"></Menu>
    </el-aside>
    <el-container style="flex: 1; overflow: hidden">
      <Header @open="changeMenuStatus"></Header>
      <Content />
      <el-footer height="20"> Copyright © 2022浙江非线数联科技股份有限公司 版权所有 </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menu from './menu/index.vue';
import Logo from './logo/index.vue';
import Header from './header/index.vue';
import Content from './content/index.vue';

const menuStatus = ref<boolean>(false);

const changeMenuStatus = (e: boolean): void => {
  menuStatus.value = e;
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.sidebar-container {
  background-color: #2d2d2d;
  color: #333;
  transition: width 0.28s;
}

.el-footer {
  color: rgb(0 0 0 / 40%);
  text-align: center;
  background-color: #f1f1f1;
  padding: 16px;
  font-size: 14px;
}
</style>
