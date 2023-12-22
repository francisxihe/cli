<template>
  <div>
    <div class="login-box">
      <div class="container">
        <div class="title-container">
          <h1 class="title">登录</h1>
          <h2 class="sub-title">Vue Template</h2>
        </div>
        <el-button type="primary" @click="onLogin">登录</el-button>
      </div>
    </div>
    <footer class="copyright">Copyright @ Forever 非线数联. All Rights Reserved</footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router/composables';

const router = useRouter();

const route = useRoute();

console.log(router);
console.log(route);

const formState = reactive({
  user: 'admin',
  password: '123456',
});

const onLogin = () => {
  console.log(formState);
  router.replace('/dashboard');
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/login-bg.png') no-repeat;
  background-size: 100% 100%;

  .container {
    position: absolute;
    top: 22%;
    left: 5%;
    min-height: 500px;

    .title-container {
      font-size: 30px;
      line-height: 80px;
      margin-bottom: 50px;
    }
  }
}

.copyright {
  font-size: 14px;
  position: absolute;
  left: 5%;
  bottom: 64px;
}
</style>
