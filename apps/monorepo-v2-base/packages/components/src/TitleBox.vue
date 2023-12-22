<template>
  <div>
    <div class="title">
      <div class="icon"></div>
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 8px 0px 8px 16px;
  font-size: 16px;
  font-weight: 700;
  .icon {
    height: 22px;
    width: 2px;
    background: #02a7f0;
    margin-right: 8px;
  }
}
</style>
