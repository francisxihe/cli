<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { asyncPermissonRouter } from './common/permission';
import router from './router';

export default defineComponent({
  setup(props) {
    asyncPermissonRouter(router);
  },
});
</script>
