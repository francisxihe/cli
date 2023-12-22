<template>
  <el-button :loading="isLoading" @click="onClickConfirm">确定</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isLoading = ref<boolean>(false);
const onClickConfirm = () => {
  isLoading.value = true;
  console.log('confirm');
  isLoading.value = false;
};
</script>
