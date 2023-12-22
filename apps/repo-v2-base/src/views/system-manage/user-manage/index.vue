<template>
  <div class="user-manage">
    <div class="left">
      <dept-tree :value.sync="searchForm.deptId" :tree="deptTree" @change="getTableData"></dept-tree>
    </div>
    <div class="main">
      <el-form ref="searchFormRef" :model="searchForm" label-width="68px" :inline="true">
        <el-form-item label="用户名" prop="name_like">
          <el-input v-model.trim="searchForm.username_like" size="small" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile_like">
          <el-input v-model.trim="searchForm.mobile_like" size="small" placeholder="请输入手机号码" clearable />
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-select v-model="searchForm.status" clearable>
            <el-option v-for="(value, key) in UserStatusMap" :key="key" :label="value" :value="key"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="onClickSearch">查询</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="onClickSearchFormReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询列表 -->
      <div class="table__wrapper">
        <el-row class="table__actions">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="onClickCreate">新增</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="multipleTable"
          class="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          stripe
          align="center"
        >
          <el-table-column type="selection" align="center" width="55" />
          <el-table-column label="序号" type="index" align="center" width="60" />
          <el-table-column prop="username" align="center" label="用户名" show-overflow-tooltip />
          <el-table-column prop="name" align="center" label="姓名" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="mobile" align="center" label="手机号码" show-overflow-tooltip />
          <el-table-column label="状态" prop="statusText" align="center"> </el-table-column>
          <el-table-column align="center" label="创建时间" width="100">
            <template #default="scope">{{ formatDate(scope.row.createDate) }} </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template #default="scope">
              <el-button type="text" size="small" @click="onClickRowAssignRole(scope.row)">分配角色</el-button>
              <el-button type="text" size="small" @click="onClickRowUpdate(scope.row)">修改用户信息</el-button>
              <el-button v-if="scope.row.status === -1" type="text" size="small" @click="onClickRowEnable(scope.row)">
                启用
              </el-button>
              <el-button v-if="scope.row.status !== -1" type="text" size="small" @click="onClickRowDisable(scope.row)">
                停用
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="paginationParams.total > 0"
          background
          :current-page.sync="paginationParams.pageNumber"
          :page-size.sync="paginationParams.pageSize"
          :page-sizes="[10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationParams.total"
          @size-change="getTableData"
          @current-change="getTableData"
        />
      </div>
    </div>
    <user-update
      v-if="formEditorCtr.visible && formEditorCtr.mode === ECommonEditorMode.Update && formEditorCtr.data"
      :visible.sync="formEditorCtr.visible"
      :mode="formEditorCtr.mode"
      :data="formEditorCtr.data"
      @confirm="onConfirmUserEditor"
    ></user-update>
    <user-create
      v-if="formEditorCtr.visible && formEditorCtr.mode === ECommonEditorMode.Create"
      :visible.sync="formEditorCtr.visible"
      :mode="formEditorCtr.mode"
      :data="formEditorCtr.data"
      @confirm="onConfirmUserEditor"
    ></user-create>
    <assign-role
      v-if="assignRoleCtr.visible && assignRoleCtr.data"
      :visible.sync="assignRoleCtr.visible"
      :data="assignRoleCtr.data"
      :onSubmit="assignRoleCtr.onSubmit"
    >
    </assign-role>
  </div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref } from 'vue';
import { formatDatetime } from '@fl/utils';
import { Message } from 'element-ui';
import { SystemManage } from '@/api';
import { ECommonEditorMode, ICommonEditor } from '../type';
import UserUpdate from './user-update.vue';
import UserCreate from './user-create.vue';
import DeptTree from '../components/dept-tree/index.vue';
import { useRowCurd } from '../common/rowCurd';
import DeptSelect from '../components/dept-select.vue';
import { useDeptTree } from '../common/useDeptTree';
import AssignRole from '../components/assign-role/index.vue';
import { useAssignRole } from '../components/assign-role/use';
import { useTablePagination } from '../common/tablePagination';
import { UserStatusMap } from './config';

export default defineComponent({
  components: {
    UserUpdate,
    UserCreate,
    DeptTree,
    DeptSelect,
    AssignRole,
  },
  setup() {
    let currentUser: SystemManage.User.PageItem;

    const searchForm = ref({
      username_like: undefined,
      mobile_like: undefined,
      deptId: undefined,
      status: undefined,
    });

    const { searchFormRef, paginationParams, tableData, getTableData, onClickSearch, onClickSearchFormReset } =
      useTablePagination({
        getPage: SystemManage.getUserPage,
        searchForm,
      });

    // 获取部门树信息
    const { deptTree } = useDeptTree();

    const formEditorCtr: Ref<ICommonEditor<SystemManage.User.PageItem | undefined>> = ref({
      visible: false,
      mode: ECommonEditorMode.Create,
      data: undefined,
    });

    const { onClickCreate, onClickRowUpdate } = useRowCurd<SystemManage.User.PageItem>(formEditorCtr, {
      getTableData,
    });

    const onClickRowEnable = async (row: SystemManage.User.PageItem) => {
      try {
        await SystemManage.enableUser(row.id);
        Message.success('操作成功');
      } catch (e) {
        Message.error('操作失败');
      }
      await getTableData();
    };

    const onClickRowDisable = async (row: SystemManage.User.PageItem) => {
      try {
        await SystemManage.disableUser(row.id);
        Message.success('操作成功');
      } catch (e) {
        Message.error('操作失败');
      }
      await getTableData();
    };

    const { assignRoleCtr } = useAssignRole({
      onSubmit: async (roleIdList: number[]) => {
        try {
          await SystemManage.userBindRoleList({
            userId: currentUser.id,
            roleIdList,
          });
          Message.success('操作成功');
        } catch (e) {
          Message.error('操作失败');
        }
      },
    });

    /** 分配角色 */
    const onClickRowAssignRole = async (row: SystemManage.User.PageItem) => {
      currentUser = row;
      const res = await SystemManage.getRoleListByUserId(row.id);
      assignRoleCtr.value.visible = true;
      assignRoleCtr.value.data = res.data;
    };

    onMounted(() => {
      onClickSearch();
    });

    return {
      searchFormRef,
      searchForm,
      paginationParams,
      tableData,
      deptTree,
      formEditorCtr,
      assignRoleCtr,
      getTableData,
      onChangeDept: () => getTableData(),
      onClickCreate,
      onClickRowUpdate,
      onClickRowEnable,
      onClickRowDisable,
      onClickRowAssignRole,
      onClickSearch,
      onClickSearchFormReset,
      /** 确认UserEditor */
      onConfirmUserEditor: () => getTableData(),
      /** 时间格式转换 */
      formatDate: (datetime: string) => formatDatetime(datetime, 'yyyy-MM-dd'),
      ECommonEditorMode,
      UserStatusMap,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-manage {
  display: flex;
  min-height: 100%;
}

.left {
  width: 300px;
  min-height: 100%;
  margin-right: 12px;
  padding: 12px;
  background-color: white;
}

.main {
  flex-shrink: 1;
  width: 100%;
  min-height: 100%;
  padding: 12px;
  background-color: white;
}

.el-form {
  display: flex;
  flex-wrap: wrap;

  .el-date-editor.el-input,
  .el-select,
  .el-input,
  .el-cascader {
    width: 100%;
  }
}

.table {
  margin-bottom: 12px;

  &__actions {
    margin-bottom: 12px;
  }
}
</style>
@/api/systemManage/user
