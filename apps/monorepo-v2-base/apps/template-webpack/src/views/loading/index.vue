<template>
  <section class="loading-page">
    <p class="loading">{{ loadingContent }}</p>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router/composables';
import { getMenuList, filterMenu } from '@/utils/menus';
import { api } from 'api';
import router from '@/router';

const { getUserInfo, getAppId, getUserMenu } = api.analysisSystem.commonApis;

const loadingContent = ref('正在加载中');

const rootRoutes = router.getRoutes().filter((item) => item.meta.level === 1);
const userId = ref(0);

const onLogin = async () => {
  if (!router || !router.currentRoute) {
    return;
  }
  const { token, redirectUrl } = router.currentRoute.query;
  if (!token) {
    loadingContent.value = '登录失败.用户不存在. 请检查用户信息是否已同步';
    return;
  }
  console.log(token, redirectUrl);
  window.localStorage.setItem('token', JSON.parse(JSON.stringify(token)));
  const { data } = await getUserInfo();
  window.localStorage.setItem('USER_INfO', JSON.stringify(data));
  userId.value = data.id;
  if (redirectUrl) {
    // @ts-ignore
    window.open(window.decodeURIComponent(redirectUrl));
  } else {
    await getAppID();
    router.replace(await getDefaultMenu());
  }
};

async function getAppID() {
  const { data } = await getAppId();
  let appid = undefined;
  data.forEach((item: { name: string; id: any }) => {
    if (item.name === '分析评价') {
      appid = item.id;
    }
  });
  await getMenu(appid);
  window.localStorage.setItem('appId', JSON.stringify(appid));
}

async function getMenu(id: any) {
  const params = { tenantId: id };
  const { data } = await getUserMenu(userId.value, params);
  let newData = [
    {
      app: '分析评估子系统',
      code: 'xyyjfw',
      createDate: '2023-03-14 18:08:21',
      icon: 'system',
      id: 123,
      location: 'AnalysisSystem',
      memo: '3',
      name: '信用预警服务',
      ordinal: 1,
      parentId: 117,
      permissionType: 'MENU',
      tenantId: 70007,
      type: 0,
      updateDate: '2023-03-14 18:08:21',
      updateTime: '2023-03-14 18:08:21',
      version: 2,
    },
  ];
  window.localStorage.setItem('menu', JSON.stringify(newData));
}

async function getDefaultMenu() {
  const menu = getMenuList(filterMenu(rootRoutes));

  const redrict = menu[0];
  return redrict.redirect || redrict.path;
}
onMounted(() => {
  // TODO: 待联调
  onLogin();
  // setTimeout(() => {
  //   onLogin();
  // }, 2000);
});
</script>

<style lang="scss" scoped>
.loading-page {
  background: rgb(66 86 179 / 80%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: white;
    font-size: $font-size-xxl;
    font-weight: 500;
  }

  /* loading dots */

  .loading::after {
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      color: rgb(0 0 0 / 0%);
      text-shadow: 0.25em 0 0 rgb(0 0 0 / 0%), 0.5em 0 0 rgb(0 0 0 / 0%);
    }

    40% {
      color: white;
      text-shadow: 0.25em 0 0 rgb(0 0 0 / 0%), 0.5em 0 0 rgb(0 0 0 / 0%);
    }

    60% {
      text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgb(0 0 0 / 0%);
    }

    80%,
    100% {
      text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
    }
  }
}
</style>
