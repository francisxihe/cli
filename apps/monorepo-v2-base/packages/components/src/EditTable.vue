<template>
  <div class="tableDiv">
    <el-table
      :data="tableData"
      highlight-current-row
      :header-cell-style="{ background: '#FAFAFA' }"
      border
      @cell-click="cellClick"
    >
      <el-table-column label="序号" type="index" width="60"></el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template #default="{ row, $index }">
          <el-input
            v-if="item.edit"
            ref="tableInput"
            v-model="row[item.prop]"
            size="small"
            @blur="removeClass"
            @change="handleEdit(item.prop, $index, row)"
          ></el-input>
          <span :class="item.edit ? 'fx_canWrite' : ''">{{ row[item.prop] }}</span>
        </template>
        <!-- <el-table-column v-for="(itemchild, indexchild) in item.children" :key="indexchild" :prop="itemchild.prop"
          :label="itemchild.label" :width="itemchild.width">
          <template slot-scope="scope">
            <el-input v-if="itemchild.edit" size="small" ref="tableInput" v-model="scope.row[itemchild.prop]"
              @blur="removeClass" @change="handleEdit(itemchild.prop, scope.$index, scope.row)"></el-input>
            <span>{{ scope.row[itemchild.prop] }}</span>
          </template>
        </el-table-column> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
//  { label: '检查事项', prop: 'jcsx', edit: false },
import { PropType } from 'vue';
interface columnsItem {
  prop: string;
  label: string;
  edit: boolean;
  width?: any;
}
defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array as PropType<columnsItem[]>,
    default: () => [],
  },
});
const handleEdit = (prop, index, row) => {
  console.log(prop, index, row);
};
const cellClick = (row, column, cell) => {
  for (let i = 0; i < document.getElementsByClassName('current-cell').length; i++) {
    document.getElementsByClassName('current-cell')[i].classList.remove('current-cell');
  }
  cell.classList.add('current-cell');
};
const removeClass = () => {
  document.getElementsByClassName('current-cell')[0].classList.remove('current-cell');
};
</script>

<style scoped>
.fx_canWrite {
  color: blue;
}

.tableDiv {
  width: 100%;
}

.tableDiv .el-input {
  display: none;
}

.current-cell .el-input {
  display: block;
}

.current-cell .el-input + span {
  display: none;
}
</style>
