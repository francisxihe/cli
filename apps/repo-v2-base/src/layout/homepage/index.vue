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
    height: 50px;
    background-color: #fff;
  }

  .info-box {
    width: 1200px;
    height: 220px;
    margin-top: 60px;
    background: rgb(174 174 174);
  }
}
</style>
