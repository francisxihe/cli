<template>
  <div class="page-box">
    <div class="header-box">
      Header
      <el-button @click="$router.push('/dashboard')">首页</el-button>
    </div>
    <div class="info-box">UserInfo</div>
    <page-menu />
    <div class="footer-box">Footer</div>
  </div>
</template>

<script lang="ts" setup>
import PageMenu from './menu/index.vue';
</script>

<style lang="scss" scoped>
.page-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eff0f1;

  .header-box {
    position: fixed;
  }

  .header-box,
  .footer-box {
    width: 100%;
    background-color: #fff;
    height: 50px;
  }

  .info-box {
    margin-top: 60px;
    width: 1200px;
    height: 220px;
    background: rgb(174 174 174);
  }
}
</style>
