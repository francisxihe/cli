<template>
  <!-- 添加/修改 -->
  <div>
    <el-form ref="editorFormRef" :model="editorForm" label-width="80px" :rules="permissionRules" size="medium">
      <el-row type="flex" style="flex-wrap: wrap; width: 100%;">
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model.trim="editorForm.name" placeholder="请输入菜单名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父菜单" prop="parentId">
            <permission-select :value.sync="editorForm.parentId" :tree="permissionTree"></permission-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="路径" prop="location">
            <el-input v-model="editorForm.location" placeholder="请输入菜单路径" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-select v-model="editorForm.type" placeholder="请选择菜单类型">
              <el-option
                v-for="option in typeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <template v-if="editorForm.type === EPermissionType.菜单">
          <el-col :span="12">
            <el-form-item label="重定向" prop="redirect">
              <el-input v-model="editorForm.redirect" placeholder="请输入菜单路径" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="ordinal">
              <el-input
                v-model="editorForm.ordinal"
                type="number"
                placeholder="请输入排序"
                :disabled="mode === 'view'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隐藏" prop="hidden">
              <el-switch v-model="editorFormHidden"></el-switch>
            </el-form-item>
          </el-col>
        </template>
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
import { PropType, Ref, computed, defineComponent, ref, toRef, watch } from 'vue';
import { Message } from 'element-ui';
import { SystemManage } from '@/api';
import { EPermissionType } from '@/api/systemManage/permission/enum';
import { ECommonEditorMode } from '../../type';
import { EditorModeMap, permissionRules, permissionTypeMap } from '../config';
import { usePermissionSelect } from '../../components/permission-select/use';
import PermissionSelect from '../../components/permission-select/index.vue';
import { PermissionWeb } from '../type';

export type PermissionEditorProps = {
  mode: ECommonEditorMode;
  data: PermissionWeb.CreateWeb | SystemManage.Permission.Detail;
};

export default defineComponent({
  name: 'PermissionEditor',
  components: { PermissionSelect },
  props: {
    mode: {
      type: String as PropType<PermissionEditorProps['mode']>,
      required: true,
    },
    data: {
      type: Object as PropType<PermissionEditorProps['data']>,
      required: true,
    },
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const editorFormRef = ref();

    const editorForm: Ref<PermissionWeb.CreateWeb | PermissionWeb.UpdateWeb> = ref(props.data);

    const editorFormHidden = computed({
      set(value?: boolean) {
        editorForm.value.hidden = value ? 1 : 0;
      },
      get() {
        return !!editorForm.value.hidden;
      },
    });

    // 提交
    async function onClickConfirm() {
      const valid = await editorFormRef.value.validate();
      if (!valid) {
        return;
      }
      if (props.mode === ECommonEditorMode.Update) {
        const params = {
          ...props.data,
          ...editorForm.value,
        } as SystemManage.Permission.Update;

        const res = await SystemManage.updatePermission(params);
        if (res.code === 200) {
          Message.success('修改成功');
          editorFormRef.value.resetFields();
          emit('confirm');
        } else {
          Message.error(res.msg || '修改失败');
        }
      }
      if (props.mode === ECommonEditorMode.Create) {
        const res = await SystemManage.createPermission(editorForm.value);
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

    watch(toRef(props, 'data'), data => {
      editorForm.value = props.data;
    });

    const { permissionTree } = usePermissionSelect();

    return {
      editorFormRef,
      editorForm,
      permissionTree,
      editorFormHidden,
      onClickConfirm,
      onClickCancel,
      EPermissionType,
      EditorModeMap,
      ECommonEditorMode,
      permissionRules,
      typeOptions: Object.keys(permissionTypeMap).map(key => {
        return {
          value: Number(key),
          label: permissionTypeMap[key],
        };
      }),
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
@/api/systemManage/permission/enum
