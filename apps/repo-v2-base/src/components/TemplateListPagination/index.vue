<template>
  <el-pagination
    :current-page.sync="pageNumber"
    :page-sizes="[100, 200, 300, 400]"
    :page-size.sync="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script lang="ts" setup>
const pageNumber = ref(1);
const pageSize = ref(10);

const handleSizeChange = () => {
  console.log('handleSizeChange');
};

const handleCurrentChange = () => {
  console.log('handleCurrentChange');
};
</script>
