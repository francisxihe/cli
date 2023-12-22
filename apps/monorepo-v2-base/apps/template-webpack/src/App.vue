<template>
  <div id="sub-app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import router from './router';

onMounted(() => {
  console.log('router.currentRoute', router.currentRoute);
});
</script>
