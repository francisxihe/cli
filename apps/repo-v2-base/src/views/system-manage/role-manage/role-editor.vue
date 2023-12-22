<template>
  <!-- 添加/修改 -->
  <el-dialog
    :title="EditorModeMap[mode]"
    :visible.sync="innerVisible"
    :close-on-click-modal="false"
    width="800px"
    @close="onClose"
  >
    <el-form
      ref="editorFormRef"
      :model="editorForm"
      label-width="100px"
      :rules="roleRules"
      size="medium"
      :disabled="mode === ECommonEditorMode.View"
    >
      <el-row type="flex" style="flex-wrap: wrap;">
        <el-col :span="12">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model.trim="editorForm.name" placeholder="请输入角色名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="ordinal">
            <el-input v-model="editorForm.ordinal" type="number" placeholder="请输入排序" :disabled="mode === 'view'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
import { ECommonEditorMode, ICommonEditor } from '../type';
import { EditorModeMap } from './config';

type IProps = ICommonEditor<SystemManage.Role.Create | SystemManage.Role.Update>;

export default defineComponent({
  name: 'RoleEditor',
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
      required: false,
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

    const editorForm: Ref<SystemManage.Role.Create> = ref({
      name: '',
      ordinal: 1,
    });
    const editorFormRef = ref();

    const onClose = () => {
      innerVisible.value = false;
    };

    // 提交
    async function onClickSubmitForm() {
      if (props.mode === ECommonEditorMode.View) {
        onClose();
        return;
      }
      const valid = await editorFormRef.value.validate();
      if (!valid) {
        return;
      }
      if (props.mode === ECommonEditorMode.Update) {
        const res = await SystemManage.updateRole({
          ...props.data,
          ...editorForm.value,
        } as SystemManage.Role.Update);
        if (res.code === 200) {
          Message.success('修改成功');
          emit('confirm');
        } else {
          Message.error(res.msg || '修改失败');
        }
      }
      if (props.mode === ECommonEditorMode.Create) {
        const res = await SystemManage.createRole(editorForm.value);
        if (res.code === 200) {
          Message.success('新增成功');
          emit('confirm');
        } else {
          Message.error(res.msg || '新增失败');
        }
      }
      onClose();
    }

    watch(toRef(props, 'visible'), visible => {
      if (visible === true && props.data) {
        editorForm.value = props.data;
      }
    });

    return {
      innerVisible,
      editorForm,
      editorFormRef,
      onClose,
      onClickSubmitForm,
      EditorModeMap,
      ECommonEditorMode,
      roleRules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
        ],
        ordinal: [
          {
            required: false,
            trigger: 'blur',
            validator(rule: unknown, value: number | string, next: Function) {
              if (value === undefined || value === '' || value === null) {
                next();
                return;
              }
              if (!Number.isInteger(Number(value)) || Number(value) < 1) {
                next(new Error('请输入大于0的整数!'));
                return;
              }
              next();
            },
          },
        ],
      },
    };
  },
});
</script>
