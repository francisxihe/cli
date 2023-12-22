<template>
  <el-dialog :title="title" :visible.sync="dialogVisible">
    <el-descriptions class="margin-top" :column="baseConfig.column" :border="baseConfig.border" :size="baseConfig.size">
      <el-descriptions-item v-for="(item, i) in configData" :key="i" :label="item.label">{{
        item.value
      }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['configData', 'baseConfig']);
// 弹框的数据
let configData = ref(props.configData);
// 样式的基本配置  column：一行摆几列；border：是否用线框,size："">默认、medium>中等、small>小型、mini>超小。如 {column:2,border:false，size:''}
let baseConfig = reactive(props.baseConfig);
// 弹框的显示隐藏
const dialogVisible = ref(false);
// 弹框标题
const title = ref('详情');
// 父组件打开弹框的方法
const openDetail = (data: object, detailName: string) => {
  dialogVisible.value = true;
  title.value = detailName;
  // 赋值
  configData.value.forEach((ele) => {
    ele.value = data[ele.key];
  });
};
// 导出属性方法供父组件调用
defineExpose({
  openDetail,
});
</script>
