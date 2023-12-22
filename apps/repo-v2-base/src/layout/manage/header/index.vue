<template>
  <el-header>
    <Logo />
    <div class="user-box">
      <span class="user-name">{{ userInfo.username }}</span>
      <el-divider direction="vertical"></el-divider>
      <span @click="onClickQuit">退出</span>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { toRef } from 'vue';
import { MessageBox } from 'element-ui';
import { useUserStore } from '@/store/modules/user';
import Logo from '../logo/index.vue';

const userStore = useUserStore();

const userInfo = toRef(userStore, 'userInfo');

const onClickQuit = () => {
  MessageBox.confirm('确定退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    localStorage.clear();
    window.location.href = '/login';
  });
};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px !important;
  margin-bottom: 2px;
  box-shadow: 0 1px 0 0 #ebecf0;

  i {
    color: #545c64;
    font-size: 20px;
    cursor: pointer;
  }

  i:hover {
    color: #2d2d2d;
  }

  .user-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    // color: #fff;
    .user-name {
      margin-left: 10px;
      font-weight: 500;
      font-size: $font-size-l;
    }
  }
}
</style>
@/pinia/modules/user@/pinia/modules/user
