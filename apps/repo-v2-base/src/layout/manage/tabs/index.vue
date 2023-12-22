<template>
  <section class="tabs-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, i) in tabList" :key="item.path" @click="tabClick(item, i)">
        <span :class="`${i == tabList.length - 1 ? 'currentPath' : ' '}`">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </section>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router/composables';
import { findTab } from '@/utils/menus';

const route = useRoute();
const router = useRouter();

interface TabItem {
  path: string;
  meta: {
    title: string;
  };
}

const tabList = ref<TabItem[]>([]);

// 监听路由变化
watch(
  () => route.path,
  val => {
    const tab = findTab(tabList.value, { path: val });
    if (!tab) {
      const tabArr: { path: string; meta: any }[] = [];
      route.matched.forEach(element => {
        tabArr.push({
          path: element.path,
          meta: element.meta as any,
        });
      });
      tabList.value = tabArr;
    }
  },
  { immediate: true },
);

const tabClick = (item: TabItem, i: number) => {
  if (item.path !== route.path) {
    router.replace(item.path);
  }

  // 获取 tabs-box 滚动条的宽度
  const tabsBox = document.querySelector('.tabs-box');
  const tabsBoxWidth = tabsBox?.clientWidth as number;
  // eslint-disable-next-line no-undef
  const tabItem = document.querySelectorAll('.tab-item') as NodeListOf<HTMLElement>;

  // 获取 tab-item 的总宽度
  let tabItemWidth = 0;
  tabItem.forEach(_item => {
    tabItemWidth += _item.clientWidth;
  });

  // 确保当前点击的 tab-item 在 tabs-box 的中间位置
  if (tabItemWidth > tabsBoxWidth) {
    // 获取当前点击的 tab-item 的左边距
    let currentTabItemLeft = 0;
    for (let j = 0; j < i; j++) {
      currentTabItemLeft += tabItem[j].clientWidth;
    }
    // 获取 tabs-box 的中间位置
    const tabsBoxMiddle = tabsBoxWidth / 2;
    // 获取 tabs-box 的左边距
    let tabsBoxLeft = 0;
    if (currentTabItemLeft > tabsBoxMiddle) {
      tabsBoxLeft = currentTabItemLeft - tabsBoxMiddle;
    }
    // 设置 tabs-box 的滚动条位置，缓慢滚动到中间位置
    tabsBox?.scrollTo({
      left: tabsBoxLeft,
      behavior: 'smooth',
    });
  }
};

watch(
  () => route.path,
  val => {
    const index = tabList.value.findIndex(item => item.path === val);
    nextTick(() => tabClick({ path: val, meta: route.meta as any }, index));
  },
);
</script>

<style lang="scss" scoped>
.tabs-box {
  display: flex;
  align-items: center;
  height: 38px;
  margin-left: 2px;
  padding-left: 12px;

  // 宽度自适应，超出滚动
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: #fff;
  box-shadow: 0 0 0 1px #ebecf0;

  // 删除滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  :deep(.el-breadcrumb__item .el-breadcrumb__inner) {
    color: #a0adbd !important;

    .currentPath {
      color: #041e3e !important;
    }
  }

  .tab-item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    background-color: #fff;

    // border-right: 1px solid #e4e4e4;
    cursor: pointer;

    &:hover {
      background-color: #fff;
    }

    &:last-child {
      border-right: none;
    }

    i {
      margin-left: 5px;
      color: #999;
      font-size: 12px;
      cursor: pointer;
    }

    i:hover {
      color: #333;
    }
  }

  .tab-active {
    background-color: #fff;
  }
}
</style>
