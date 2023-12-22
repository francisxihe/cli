<template>
  <el-dialog title="分配权限" :visible.sync="innerVisible" :close-on-click-modal="false" width="800px" @close="onClose">
    <div class="body">
      <div class="aside">
        <permission-tree ref="permissionTreeRef" :checkedKeys.sync="checkedPermissionIdList"></permission-tree>
      </div>
      <div class="main">
        <div class="header header--secondary">已授权</div>
        <el-checkbox-group v-model="checkedPermissionIdList">
          <el-checkbox v-for="permission in checkedPermissionList" :key="permission.id" :label="permission.id">
            {{ permission.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">取 消</el-button>
      <el-button size="mini" type="primary" @click="onClickSubmitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { PropType, Ref, computed, defineComponent, ref, toRef, watch } from 'vue';
import { Message } from 'element-ui';
import { SystemManage } from '@/api';
import { ICommonEditor } from '../../type';
import PermissionTree from './permission-tree.vue';

type IProps = ICommonEditor<SystemManage.Role.PageItem>;

export default defineComponent({
  name: 'RolePermission',
  components: { PermissionTree },
  props: {
    mode: {
      type: String as PropType<IProps['mode']>,
      required: true,
    },
    visible: {
      type: Boolean as PropType<IProps['visible']>,
      default: false,
    },
    data: {
      type: Object as PropType<IProps['data']>,
      required: true,
    },
  },
  emits: ['update:visible', 'confirm'],
  setup(props, { emit }) {
    const innerVisible = computed({
      get() {
        return props.visible;
      },
      set(value) {
        emit('update:visible', value);
      },
    });

    const permissionTreeRef = ref();
    const permissionList: Ref<SystemManage.Permission.TreeNode[]> = ref([]);
    const checkedPermissionIdList: Ref<number[]> = ref([]);

    const checkedPermissionList = computed(() => {
      return permissionTreeRef.value?.getCheckedNodes() || [];
    });

    const onClose = () => {
      innerVisible.value = false;
    };

    // 提交
    const onClickSubmitForm = async () => {
      try {
        await SystemManage.roleBindPermissionList({
          roleId: props.data.id,
          permissionIdList: checkedPermissionIdList.value,
        });
        onClose();
        emit('confirm');
        Message.success('操作成功');
      } catch (e) {
        Message.error('操作失败');
      }
    };

    watch(
      toRef(props, 'visible'),
      async visible => {
        if (visible === true) {
          const res = await SystemManage.getPermissionListByRoleId(props.data.id);
          checkedPermissionIdList.value = res.data.map(item => item.id);
        } else {
          onClose();
        }
      },
      {
        immediate: true,
      },
    );

    return {
      innerVisible,
      permissionTreeRef,
      checkedPermissionList,
      checkedPermissionIdList,
      permissionList,
      onClose,
      onClickSubmitForm,
    };
  },
});
</script>

<style lang="scss">
.body {
  display: flex;
  border: 1px solid #f0f2f5;

  .aside {
    padding: 16px;
    border-right: 1px solid #f0f2f5;
  }

  .main {
    width: 100%;
    padding: 16px;

    .header--secondary {
      width: 100%;
      height: 32px;
      margin-bottom: 16px;
      padding-left: 12px;
      color: #333;
      font-weight: 500;
      font-size: 16px;
      line-height: 32px;
      background: #eaf1ff;
      border-left: 2px solid #409eff;
    }

    .el-checkbox-group {
      .el-checkbox {
        display: block;
        margin-bottom: 8px;
        color: rgb(0 0 0 / 65%);
        font-size: 14px;
        line-height: 22px;
      }
    }
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: unset;
  }
}
</style>
