<template>
  <el-button @click="onClickCancel">取消</el-button>
</template>

<script lang="ts" setup>
const onClickCancel = () => {
  console.log('cancel');
};
</script>
