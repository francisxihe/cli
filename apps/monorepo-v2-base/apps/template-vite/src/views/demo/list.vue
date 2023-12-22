<template>
  <div class="page-box">
    <div class="search-box">
      <el-form ref="formRef" :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="输入框:">
          <el-input v-model="searchInfo.input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="选择框:">
          <el-select v-model="searchInfo.region" placeholder="选择框">
            <el-option label="选择一" value="shanghai"></el-option>
            <el-option label="选择二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="handleClick(row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: right; margin-top: 10px">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

type SearchInfo = {
  input: string;
  region: string;
};

type TableInfo = {
  date: string;
  name: string;
  address: string;
};

const formRef = ref();

const currentPage = ref<number>(10);

const searchInfo = ref<SearchInfo>({
  input: '',
  region: '',
});

const tableData = ref<TableInfo[]>([
  { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
  { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
  { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
]);

const onSubmit = () => {
  console.log(searchInfo);
};

const onReset = () => {
  console.log(formRef.value);
  formRef?.value.resetFields();
};

const handleClick = (row: object) => {
  console.log(row);
};
</script>

<style lang="scss" scoped>
.page-box {
  color: 'red';
  position: relative;
}
</style>
