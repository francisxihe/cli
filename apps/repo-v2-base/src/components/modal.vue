<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
    <div slot="footer" class="footer custom"></div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
</script>
