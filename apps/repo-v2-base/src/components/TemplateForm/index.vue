<template>
  <el-form ref="formRef" :model="form" label-width="80px">
    <el-form-item label="活动名称"> <el-input v-model="form.name"></el-input> </el-form-item>
    <el-form-item label="活动区域"> <el-input v-model="form.region"></el-input> </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
type Form = {
  name: string;
  region: string;
};

const formRef = ref<unknown>(null);
const form = ref<Form>({
  name: '',
  region: '',
});
</script>
