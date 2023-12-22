<template>
  <el-dialog title="分配用户" :visible.sync="innerVisible" :close-on-click-modal="false" width="800px" @close="onClose">
    <div class="body">
      <div class="aside">
        <dept-tree :value.sync="activedDeptId" :tree="deptTree"></dept-tree>
      </div>
      <div class="main">
        <el-checkbox-group v-model="currentCheckedUserIdList" @change="onChangeCurrentChecked">
          <el-checkbox v-for="permission in userList" :key="permission.id" :label="permission.id">
            {{ permission.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="footer">
        <div class="header header--secondary">已选用户</div>
        <el-tag v-for="user in data" :key="user.id" closable type="primary" @close="onCloseCheckedUser(user)">
          {{ user.name }}
        </el-tag>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">取 消</el-button>
      <el-button size="mini" type="primary" @click="onClickSubmitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRef, watch } from 'vue';
import { Message } from 'element-ui';
import { SystemManage } from '@/api';
import DeptTree from '../dept-tree/index.vue';
import { useCheckUserList } from './check-user';
import { useDeptTree } from '../dept-tree/use';

export type Props = {
  visible: boolean;
  data: SystemManage.User.PageItem[];
  onSubmit: (userIdList: number[]) => Promise<void>;
};

export default defineComponent({
  name: 'RolePermission',
  components: {
    DeptTree,
  },
  props: {
    visible: {
      type: Boolean as PropType<Props['visible']>,
      default: false,
    },
    data: {
      type: Array as PropType<Props['data']>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<Props['onSubmit']>,
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

    const {
      activedDeptId,
      userList,
      checkedUserList,
      currentCheckedUserIdList,
      onCloseCheckedUser,
      onChangeCurrentChecked,
    } = useCheckUserList();

    const onClose = () => {
      innerVisible.value = false;
    };

    // 提交
    const onClickSubmitForm = async () => {
      try {
        await props.onSubmit(checkedUserList.value.map(user => user.id));
        onClose();
        Message.success('操作成功');
      } catch (e) {
        Message.error('操作失败');
      }
    };

    const { deptTree } = useDeptTree();

    watch(
      toRef(props, 'visible'),
      async visible => {
        if (visible === true) {
          checkedUserList.value = props.data;
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
      deptTree,
      activedDeptId,
      currentCheckedUserIdList,
      userList,
      checkedUserList,
      onClose,
      onClickSubmitForm,
      onCloseCheckedUser,
      onChangeCurrentChecked,
    };
  },
});
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #f0f2f5;

  .aside {
    width: 40%;
    padding: 16px;
    border-right: 1px solid #f0f2f5;
    border-bottom: 1px solid #f0f2f5;
  }

  .main {
    flex-shrink: 1;
    width: 60%;
    padding: 16px;
    border-bottom: 1px solid #f0f2f5;

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

  .footer {
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
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: unset;
  }
}
</style>
