<template>
  <section>
    <default-tabs />
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </el-main>
  </section>
</template>

<script lang="ts" setup>
import DefaultTabs from '../tabs/index.vue';
</script>

<style lang="scss" scoped>
.el-main {
  height: calc(100vh - 130px);
  padding: 8px;
  overflow-y: auto;
  color: #333;
  background-color: #f1f1f1;
}
</style>
