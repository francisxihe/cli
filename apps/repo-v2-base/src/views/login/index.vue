<template>
  <body id="paper">
    <section class="login-box">
      <img src="@/assets/logo.png" />
      <el-form ref="formRef" v-loading="loading" :model="loginForm" class="login-container" label-width="0px">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="政府组织账号" name="first"></el-tab-pane>
          <el-tab-pane label="系统管理员账号" name="second"></el-tab-pane>
        </el-tabs>
        <el-form-item v-if="activeTab === 'first'" prop="orgs">
          <el-select v-model="loginForm.orgs" size="meduimn" style="width: 100%">
            <template slot="prefix">
              <SvgIcon :type="'orgsIcon'"></SvgIcon>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" placeholder="账号" size="meduimn">
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" :maxLength="16" size="meduimn">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%; background: #3078ff; border: none"
            size="meduimn"
            @click="onClickLogin()"
            @keyup.enter="onEnterLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </section>
  </body>
</template>

<script lang="ts">
import { Message } from 'element-ui';
import { defineComponent, ref } from 'vue';
import { is } from '@fl/utils';
import router from '@/router';
import { formatPermissionList, asyncPermissonRouter } from '@/common/permission';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { getUserPermission, login } from '@/api/system';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

export default defineComponent({
  components: {
    SvgIcon,
  },
  setup(props) {
    const loginForm = ref({
      username: '',
      password: '',
      orgs: null,
    });
    const loading = ref(false);
    const formRef = ref();
    const activeTab = ref('second');
    // onMounted(() => {
    //   window.addEventListener('keydown', keyDown);
    // });
    // onUnmounted(() => {
    //   window.removeEventListener('keydown', keyDown, false);
    // });

    async function onClickLogin() {
      const valid = await formRef.value.validate();
      if (!valid) {
        return;
      }
      const res = await login(loginForm.value);

      if (res.code === 200) {
        const { token } = res.data;

        userStore.setToken(token);

        userStore.setUserInfo(res.data);

        const permissionRes = await getUserPermission();

        const permissionList = formatPermissionList(permissionRes.data);

        userStore.setPermissionList(permissionList);

        asyncPermissonRouter(router);
        if (is.string(router.currentRoute.query.redirect)) {
          router.push({ path: decodeURIComponent(router.currentRoute.query.redirect) });
          return;
        }
        router.push({
          path: permissionList.filter(x => x.level === 1)[0].redirect,
        });
      } else {
        Message.error(res.msg || '请求失败');
      }
    }

    function onEnterLogin(e: KeyboardEvent) {
      if (e.key === 'enter') {
        onClickLogin(); // 定义的登录方法
      }
    }
    // function confirmSuccess(e) {
    //   this.confirmSuccessFlag = e;
    // }

    return {
      loading,
      loginForm,
      formRef,
      activeTab,
      onClickLogin,
      onEnterLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
#paper {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('../../assets/login-bg.png') no-repeat center left;
  background-color: #f5f6fa;
}

body {
  margin: 0;
}

.login-box {
  position: absolute;
  left: 50%;
  margin: 180px auto;
  text-align: center;

  img {
    width: 400px;
    height: 42px;
  }
}

.login-container {
  width: 458px;
  height: 416px;
  margin-top: 32px;
  padding: 25px 0;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 5px 20px 0 rgb(225 226 230 / 60%);
}

.el-tabs__item {
  width: 90%;
  font-size: 16px;
}

.el-form-item {
  margin: 20px 53px;
}

.el-input__prefix {
  left: 0;
  display: table-cell;
  padding: 0 20px;
  color: #909399;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.el-input--prefix .el-input__inner {
  padding-left: 65px;
}
</style>
@/pinia/modules/user@/pinia/modules/user
