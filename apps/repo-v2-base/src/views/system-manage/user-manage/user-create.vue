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
      :rules="userRules"
      size="medium"
      :disabled="mode === ECommonEditorMode.View"
    >
      <el-row type="flex" style="flex-wrap: wrap;">
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model.trim="editorForm.username" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属部门" prop="deptId">
            <dept-select :value.sync="editorForm.deptId" :tree="deptTree"></dept-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="editorForm.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model.trim="editorForm.mobile" :maxLength="11" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="editorForm.password" placeholder="请输入登录密码" :maxLength="16" type="password" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重复密码" prop="checkPassword">
            <el-input v-model="editorForm.checkPassword" placeholder="请确认登录密码" :maxLength="16" type="password" />
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
import { useDeptTree } from '../common/useDeptTree';
import DeptSelect from '../components/dept-select.vue';
import { UserWeb } from './type';

type IProps = ICommonEditor<SystemManage.User.PageItem | undefined>;

export default defineComponent({
  name: 'UserEditor',
  components: {
    DeptSelect,
  },
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

    const editorForm: Ref<UserWeb.CreateWeb> = ref({
      username: '',
      name: '',
      deptId: 0,
      password: '',
      checkPassword: '',
    });
    const editorFormRef = ref();

    const onClose = () => {
      innerVisible.value = false;
    };

    // 提交
    async function onClickSubmitForm() {
      const valid = await editorFormRef.value.validate();
      if (!valid) {
        return;
      }
      const res = await SystemManage.createUser(editorForm.value);
      if (res.code === 200) {
        Message.success('新增成功');
        emit('confirm');
      } else {
        Message.error(res.msg || '新增失败');
      }
      onClose();
    }

    const { deptTree } = useDeptTree();

    const userRules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ],
      mobile: [
        {
          trigger: 'blur',
          validator(rule: unknown, value: string, next: Function) {
            if (value === '' || value === undefined || value === null) {
              next();
              return;
            }
            const reg = /^1\d{10}$/;
            if (!reg.test(value)) {
              next(new Error('手机号码格式不正确'));
            }
            next();
          },
        },
      ],
      password: [
        {
          required: true,
          message: '请输入登录密码',
          trigger: 'blur',
        },
        {
          validator(rule: unknown, value: string, next: Function) {
            if (value === '') {
              next(new Error('请输入登录密码'));
              return;
            }
            const reg = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?()]).*$/;
            if (!reg.test(value)) {
              next(new Error('密码长度8-16，且必须包含数字、小写字母、大写字母、特殊字符'));
            }
            next();
          },
          trigger: 'blur',
        },
      ],
      checkPassword: [
        {
          required: true,
          message: '请确认登录密码',
          trigger: 'blur',
        },
        {
          validator(rule: unknown, value: string, next: Function) {
            if (value === '') {
              next(new Error('请再次输入密码'));
            } else if (value !== editorForm.value.password) {
              next(new Error('两次输入密码不一致!'));
            } else {
              next();
            }
          },
          trigger: 'blur',
        },
      ],
    };

    watch(toRef(props, 'visible'), visible => {
      if (visible === true && props.data) {
        editorForm.value = {
          ...props.data,
          password: '',
          checkPassword: '',
        };
      }
    });

    return {
      innerVisible,
      editorFormRef,
      editorForm,
      deptTree,
      onClose,
      onClickSubmitForm,
      EditorModeMap,
      ECommonEditorMode,
      userRules,
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
</style>
