<template>
  <el-dialog title="分配部门" :visible.sync="innerVisible" :close-on-click-modal="false" width="800px" @close="onClose">
    <div class="body">
      <div class="aside">
        <dept-tree ref="deptTreeRef" :checkedKeys.sync="checkedDeptIdList"></dept-tree>
      </div>
      <div class="main">
        <div class="header header--secondary">已授权</div>
        <el-checkbox-group v-model="checkedDeptIdList">
          <el-checkbox v-for="dept in checkedDeptList" :key="dept.id" :label="dept.id">
            {{ dept.name }}
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
import { SystemManage } from '@/api';
import DeptTree from './dept-tree.vue';

export type Props = {
  visible: boolean;
  data: number[];
  onSubmit: (deptIdList: number[]) => Promise<void>;
};
export default defineComponent({
  name: 'RoleDept',
  components: { DeptTree },
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
    const deptTreeRef = ref();
    const deptList: Ref<SystemManage.Dept.TreeNode[]> = ref([]);
    const checkedDeptIdList: Ref<number[]> = ref([]);

    const checkedDeptList = computed(() => {
      return deptTreeRef.value?.getCheckedNodes() || [];
    });

    const onClose = () => {
      innerVisible.value = false;
    };

    // 提交
    const onClickSubmitForm = async () => {
      await props.onSubmit(checkedDeptIdList.value);
      onClose();
    };

    watch(
      toRef(props, 'visible'),
      async visible => {
        if (visible === true) {
          checkedDeptIdList.value = props.data;
        } else {
          innerVisible.value = false;
        }
      },
      {
        immediate: true,
      },
    );

    return {
      deptTreeRef,
      innerVisible,
      checkedDeptList,
      checkedDeptIdList,
      deptList,
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
