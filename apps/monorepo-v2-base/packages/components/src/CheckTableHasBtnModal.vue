<template>
  <span class="fx_btnWrap">
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handelOpen">{{ config.btnName }}</el-button>
    <el-dialog
      :title="config.dialogName"
      :width="'800px'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form ref="searchRef" :inline="true" :model="searchForm">
        <el-form-item :label="config.searchLable" prop="xydm">
          <el-input v-model="searchForm.xydm" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading"
        size="medium"
        :header-cell-style="{ background: '#FAFAFA' }"
        border
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" type="index" width="60"> </el-table-column>
        <el-table-column v-for="(item, i) in columns" :key="i" :prop="item.prop" :label="item.label"></el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="sureIt">确定</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script lang="ts" setup>
import { Message } from 'element-ui';
import { PropType, ref, reactive } from 'vue';
import { getRequest } from '../../api/index';
const request = getRequest();

interface columnsItem {
  prop: string;
  label: string;
}
const loading = ref(false);
const searchRef = ref();
const searchForm = reactive({
  xydm: '',
});
// 勾选
const eventLists = ref<any[]>([]);
const handleSelectionChange = (data: any) => {
  eventLists.value = data;
};
const handleSearch = () => {
  if (searchForm.xydm) {
    getTableDataModal();
  } else {
    Message.info('请输入' + props.config.searchLable);
  }
};

const handleReset = () => {
  searchRef.value.resetFields();
  tableData.value = [];
  loading.value = false;
};

const emits = defineEmits(['reload']);
let props = defineProps({
  config: {
    type: Object,
    default: () => {
      return {};
    },
  },
  selectItems: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array as PropType<columnsItem[]>,
    default: () => [],
  },
});
const tableData: any = ref([]);
const dialogVisible = ref(false);

// 保存
const sureIt = async () => {
  if (eventLists.value && eventLists.value.length) {
    const { code } = await newAdd(tableData.value[0]);
    if (code == 200) {
      Message.success('新增成功');
      emits('reload');
      handleClose();
    }
  } else {
    Message.info('请先勾选');
  }
};
// 打开弹框
const handelOpen = () => {
  dialogVisible.value = true;
};
// 列表数据
const getTableDataModal = async () => {
  loading.value = true;
  const { code, data } = await getTableDataList(searchForm.xydm);
  loading.value = false;
  if (code === 200) {
    tableData.value = [{ ...data }];
  }
};
// 获取列表
const getTableDataList = (data: any) => {
  return request.get({ url: props.config.listUrl + '/' + data });
};
// 确认新增
const newAdd = (data: any) => {
  return request.post({ url: props.config.addUrl, data });
};
// 关闭清空表单
const handleClose = () => {
  handleReset();
  dialogVisible.value = false;
  loading.value = false;
};
</script>

<style lang="scss" scoped>
.fx_btnWrap {
  display: inline-block;
  margin-right: 8px;
}

.fx_tableWrap {
  margin-top: 16px;
}
</style>
