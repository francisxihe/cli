<template>
  <el-header>
    <div>
      <i :class="open ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="changeMenu"></i>
    </div>
    <div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar src="https://img.yzcdn.cn/vant/cat.jpeg" size="small" fit="fill" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="center">个人中心</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router/composables';
import { ref } from 'vue';

const router = useRouter();

const open = ref<boolean>(false);

const emits = defineEmits(['open']);

const changeMenu = () => {
  open.value = !open.value;
  emits('open', open.value);
};

const handleCommand = (command: string) => {
  switch (command) {
    case 'center':
      router.push('/center');
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    font-size: 20px;
    cursor: pointer;
    color: #545c64;
  }

  i:hover {
    color: #2d2d2d;
  }
}
</style>
