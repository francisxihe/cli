<template>
  <div class="role-manage">
    <div class="main">
      <el-form ref="searchFormRef" :model="searchForm" label-width="68px" :inline="true">
        <el-form-item label="角色名称" prop="name_like">
          <el-input v-model.trim="searchForm.name_like" size="small" placeholder="请输入角色名称" clearable />
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId">
          <dept-select :value.sync="searchForm.deptId" :tree="deptTree"></dept-select>
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
          <el-table-column prop="name" align="center" label="角色名称" show-overflow-tooltip>
            <template #default="scope">
              <span class="el-button--text" style="cursor: pointer;" @click="onClickRowView(scope.row)">
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="所属部门" prop="deptsText" align="center"> </el-table-column>
          <!-- <el-table-column label="状态" prop="statusText" align="center"> </el-table-column> -->
          <el-table-column align="center" label="创建时间" width="100">
            <template #default="scope">{{ formatDate(scope.row.createDate) }} </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template #default="scope">
              <el-button type="text" size="small" @click="onClickRowUpdate(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="onClickRowDelete(scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="onClickRowAssignUser(scope.row)">分配用户</el-button>
              <el-button type="text" size="small" @click="onClickRowAssignPermission(scope.row)">分配权限</el-button>
              <el-button type="text" size="small" @click="onClickRowAssignDept(scope.row)">分配部门</el-button>
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
    <role-editor
      :visible.sync="formEditorCtr.visible"
      :mode="formEditorCtr.mode"
      :data="formEditorCtr.data"
      @confirm="onConfirmRoleEditor"
    ></role-editor>
    <role-permission
      v-if="rolePermissionCtr.data"
      :visible.sync="rolePermissionCtr.visible"
      :mode="rolePermissionCtr.mode"
      :data="rolePermissionCtr.data"
    >
    </role-permission>
    <assign-user
      v-if="assignUserCtr.visible && assignUserCtr.data"
      :visible.sync="assignUserCtr.visible"
      :data="assignUserCtr.data"
      :onSubmit="assignUserCtr.onSubmit"
    >
    </assign-user>
    <role-dept
      v-if="roleDeptCtr.data"
      :visible.sync="roleDeptCtr.visible"
      :mode="roleDeptCtr.mode"
      :data="roleDeptCtr.data"
      @confirm="onConfirmRoleEditor"
    ></role-dept>
  </div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref } from 'vue';
import { formatDatetime } from '@fl/utils';
import { SystemManage } from '@/api';
import { ECommonEditorMode, ICommonEditor } from '../type';
import RoleEditor from './role-editor.vue';
import RolePermission from './role-permission/index.vue';
import RoleDept from './role-dept/index.vue';
import DeptTree from '../components/dept-tree/index.vue';
import { useRowCurd } from '../common/rowCurd';
import AssignUser from '../components/assign-user/index.vue';
import { useAssignUser } from '../components/assign-user/use';
import { useDeptTree } from '../components/dept-tree/use';
import DeptSelect from '../components/dept-select.vue';
import { useTablePagination } from '../common/tablePagination';

export default defineComponent({
  components: {
    RoleEditor,
    RolePermission,
    AssignUser,
    RoleDept,
    DeptTree,
    DeptSelect,
  },
  setup(props) {
    const currentRole = ref();
    const searchForm = ref({
      name_like: undefined,
      deptId: undefined,
    });

    const { searchFormRef, paginationParams, tableData, getTableData, onClickSearch, onClickSearchFormReset } =
      useTablePagination({
        getPage: SystemManage.getRolePage,
        searchForm,
      });

    const formEditorCtr: Ref<ICommonEditor<SystemManage.Role.PageItem | undefined>> = ref({
      visible: false,
      mode: ECommonEditorMode.Create,
      data: undefined,
    });

    const { onClickCreate, onClickRowUpdate, onClickRowView, onClickRowDelete } = useRowCurd(formEditorCtr, {
      deleteHandler: SystemManage.deleteRole,
      getTableData,
    });

    const { assignUserCtr } = useAssignUser({
      onSubmit: async (userIdList: number[]) => {
        await SystemManage.roleBindUserList({
          roleId: currentRole.value.id,
          userIdList,
        });
      },
    });

    /** 分配用户 */
    const onClickRowAssignUser = async (row: SystemManage.Role.PageItem) => {
      currentRole.value = row;
      const res = await SystemManage.getUserListByRoleId(row.id);
      assignUserCtr.value.visible = true;
      assignUserCtr.value.data = res.data;
    };

    const rolePermissionCtr: Ref<ICommonEditor<SystemManage.Role.PageItem | undefined>> = ref({
      visible: false,
      mode: ECommonEditorMode.Create,
      data: undefined,
    });
    /** 分配权限 */
    const onClickRowAssignPermission = async (row: SystemManage.Role.PageItem) => {
      rolePermissionCtr.value = {
        visible: true,
        mode: ECommonEditorMode.View,
        data: row,
      };
    };

    const roleDeptCtr: Ref<ICommonEditor<SystemManage.Role.PageItem | undefined>> = ref({
      visible: false,
      mode: ECommonEditorMode.Create,
      data: undefined,
    });

    /** 分配部门 */
    const onClickRowAssignDept = async (row: SystemManage.Role.PageItem) => {
      roleDeptCtr.value = {
        visible: true,
        mode: ECommonEditorMode.View,
        data: row,
      };
    };
    const { deptTree } = useDeptTree();

    onMounted(() => {
      onClickSearch();
    });
    return {
      searchFormRef,
      searchForm,
      paginationParams,
      tableData,
      formEditorCtr,
      rolePermissionCtr,
      assignUserCtr,
      roleDeptCtr,
      deptTree,
      getTableData,
      onChangeDept: () => getTableData(),
      onClickCreate,
      onClickRowUpdate,
      onClickRowView,
      onClickRowDelete,
      onClickRowAssignUser,
      onClickRowAssignPermission,
      onClickRowAssignDept,
      onClickSearch,
      onClickSearchFormReset,
      /** 确认RoleEditor */
      onConfirmRoleEditor: () => getTableData(),
      /** 时间格式转换 */
      formatDate: (datetime: string) => formatDatetime(datetime, 'yyyy-MM-dd'),
    };
  },
});
</script>

<style lang="scss" scoped>
.role-manage {
  display: flex;
  height: 100%;
}

.left {
  width: 220px;
  height: 100%;
  margin-right: 12px;
  padding: 12px;
  background-color: white;
}

.main {
  flex-shrink: 1;
  width: 100%;
  height: 100%;
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
@/api/systemManage/role
