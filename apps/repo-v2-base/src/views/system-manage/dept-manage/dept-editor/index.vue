<template>
  <div>
    <el-form
      ref="editorFormRef"
      :model="editorForm"
      label-width="120px"
      :rules="deptRules"
      size="medium"
      :disabled="mode === ECommonEditorMode.View"
    >
      <el-row type="flex" style="flex-wrap: wrap;">
        <el-col :span="12">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model.trim="editorForm.name" placeholder="请输入部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父部门" prop="parentId">
            <dept-select :value.sync="editorForm.parentId" :tree="deptTree"></dept-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门负责人" prop="leader">
            <el-input v-model="editorForm.leader" placeholder="请输入部门负责人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人手机" prop="phone">
            <el-input v-model="editorForm.phone" :maxLength="11" placeholder="请输入负责人手机" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门负责人Id" prop="leaderId">
            <el-input v-model="editorForm.leaderId" type="number" placeholder="请输入部门负责人Id" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="ordinal">
            <el-input v-model="editorForm.ordinal" type="number" placeholder="请输入排序" :disabled="mode === 'view'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <el-button size="mini" type="primary" @click="onClickConfirm">
        <template v-if="mode === ECommonEditorMode.Create"> 新 增 </template>
        <template v-if="mode === ECommonEditorMode.Update"> 更 新 </template>
      </el-button>
      <el-button size="mini" @click="onClickCancel">
        <template v-if="mode === ECommonEditorMode.Create"> 重 置 </template>
        <template v-if="mode === ECommonEditorMode.Update"> 取 消 </template>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, Ref, defineComponent, ref, toRef, watch } from 'vue';
import { Message } from 'element-ui';
import { SystemManage } from '@/api';
import { ECommonEditorMode } from '../../type';
import { EditorModeMap, deptRules } from '../config';
import DeptSelect from '../../components/dept-select.vue';
import { useDeptTree } from '../dept-tree/use';
import { DeptWeb } from '../type';

export type DeptEditorProps = {
  mode: ECommonEditorMode;
  data: DeptWeb.CreateWeb | SystemManage.Dept.Detail;
};

export default defineComponent({
  name: 'DeptEditor',
  components: {
    DeptSelect,
  },
  props: {
    mode: {
      type: String as PropType<DeptEditorProps['mode']>,
      required: true,
    },
    data: {
      type: Object as PropType<DeptEditorProps['data']>,
      required: true,
    },
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const editorForm: Ref<DeptWeb.CreateWeb | DeptWeb.UpdateWeb> = ref(props.data);

    const editorFormRef = ref();

    /** 提交 */
    async function onClickConfirm() {
      const valid = await editorFormRef.value.validate();
      if (!valid) {
        return;
      }
      if (props.mode === ECommonEditorMode.Update) {
        const res = await SystemManage.updateDept({
          ...props.data,
          ...editorForm.value,
        } as SystemManage.Dept.Update);
        if (res.code === 200) {
          Message.success('修改成功');
          editorFormRef.value.resetFields();
          emit('confirm');
        } else {
          Message.error(res.msg || '修改失败');
        }
      }
      if (props.mode === ECommonEditorMode.Create) {
        const res = await SystemManage.createDept({
          ...editorForm.value,
        });
        if (res.code === 200) {
          Message.success('新增成功');
          editorFormRef.value.resetFields();
          emit('confirm');
        } else {
          Message.error(res.msg || '新增失败');
        }
      }
    }

    /** 取消 */
    async function onClickCancel() {
      editorFormRef.value.resetFields();
      emit('cancel');
    }

    // 获取部门树信息
    const { deptTree } = useDeptTree();

    watch(toRef(props, 'data'), data => {
      editorForm.value = props.data;
    });

    return {
      editorFormRef,
      editorForm,
      deptTree,
      onClickConfirm,
      onClickCancel,
      EditorModeMap,
      ECommonEditorMode,
      deptRules,
    };
  },
});
</script>

<style lang="scss" scoped>
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

.footer {
  display: flex;
  justify-content: center;
}
</style>
