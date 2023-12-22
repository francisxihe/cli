<template>
  <section class="logo-box">
    <img src="@/assets/logo.png" />
    <!-- <h3>公安自助终端联网监测平台</h3> -->
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
  display: flex;
  align-items: center;
  padding: 10px;
  color: #434993;
  font-size: 18px;

  img {
    width: 504px;
    height: 55px;
  }

  h3 {
    margin-left: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 28px;
  }
}
</style>
