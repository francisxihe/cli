<template>
  <el-main>
    <div class="content">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </div>
  </el-main>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.content {
  min-height: 100%;
  padding: 16px;
  background-color: #fff;
}

.el-main {
  height: calc(100vh - 100px);
  padding: 8px 8px 0;
  color: #333;
  background-color: #f1f1f1;
}
</style>
