<template>
  <section class="logo-box">
    <img src="@/assets/logo.png" />
    <h3 v-show="!status">v2_template</h3>
  </section>
</template>

<script lang="ts" setup>
defineProps({
  status: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.logo-box {
  height: 60px;
  padding: 10px;
  background: #2d2d2d;
  display: flex;
  align-items: center;
  color: #fff;

  img {
    height: 100%;
  }

  h3 {
    margin-left: 10px;
  }
}
</style>
