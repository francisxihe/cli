<template>
  <el-form ref="formRef" inline :model="form" label-width="80px">
    <el-form-item label="活动名称"> <el-input v-model="form.name"></el-input> </el-form-item>
    <el-form-item label="活动区域"> <el-input v-model="form.region"></el-input> </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
type Form = {
  name: string;
  region: string;
};

const formRef = ref<any>(null);
const form = ref<Form>({
  name: '',
  region: '',
});

const search = () => {
  console.log('search');
};

const reset = () => {
  formRef.value.resetFields();
};
</script>
