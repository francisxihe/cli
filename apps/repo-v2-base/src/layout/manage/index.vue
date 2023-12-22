<template>
  <el-container style="flex-direction: column;">
    <Header @open="changeMenuStatus"></Header>
    <el-container>
      <el-aside :width="menuStatus ? '64px' : '210px'" class="sidebar-container">
        <Menu :status="menuStatus"></Menu>
      </el-aside>
      <div style="flex: 1; overflow: hidden;">
        <Content />
      </div>
    </el-container>
    <el-container>
      <!-- <el-footer height="20"> Copyright © 2022浙江非线数联科技股份有限公司 版权所有 </el-footer> -->
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
  padding-top: 16px;

  // background-color: #434993;
  // color: #fff;
  transition: width 0.28s;

  img {
    position: absolute;
    bottom: 20px;
    width: 210px;
  }
}
</style>
