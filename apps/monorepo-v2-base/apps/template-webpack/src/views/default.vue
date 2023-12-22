<template>
  <div class="content">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<style lang="scss" scoped>
.content {
  min-height: 100%;
  padding: 16px;
  background-color: #fff;
}

.el-main {
  background-color: #f1f1f1;
  color: #333;
  padding: 16px 16px 56px;
}
</style>
