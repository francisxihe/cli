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
  background-color: #f1f1f1;
  color: #333;
  padding: 16px 16px 0;
}
</style>
