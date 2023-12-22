<template>
  <div>
    <h1 class="title">dashboard $spacer</h1>
    <div class="text-1">万里滔滔江水永不休 $font-size</div>
    <div class="text-2">万里滔滔江水永不休 $font-size-base</div>
    <div class="text-3">万里滔滔江水永不休 $font-size-l</div>
    <div class="text-5">万里滔滔江水永不休 $font-size-xl</div>
    <div class="text-6">万里滔滔江水永不休 $font-size-xxl</div>

    <el-button v-loading="onClickAsyncButton" type="primary"> Loading Button </el-button>

    <div class="g-card">123123</div>

    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <el-button type="primary" @click="onShowModal">打开弹框</el-button>
    <custom-modal ref="modal" />
  </div>
</template>

<script lang="ts">
// import { getSystemList, createUser } from '@/apis/demo';
import { defineComponent, onMounted, ref } from 'vue';
import CustomModal from './components/modal.vue';

export default defineComponent({
  name: 'Dashboard',
  components: { CustomModal },
  setup() {
    const value1 = ref(null);

    const modal = ref();

    const onShowModal = () => {
      console.log(modal.value);
      modal.value.dialogVisible = true;
    };

    const onClickAsyncButton = async () => {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log(`%c%s`, 'color: #4CAF50; font-weight: bold', '-end-');
          resolve();
          // reject('error');
        }, 2000);
      });
    };

    // const onCreateUser = async () => {
    //   const data = {
    //     name: '蔡娜',
    //     age: 74,
    //     male: 2,
    //     email: 'p.osjfkwy@ndzdt.nt',
    //     github: 'http://veqcoetps.eg/qiihlod',
    //   };
    //   await createUser(data);
    // };

    onMounted(async () => {
      // const res = await getSystemList();
      // console.log(res);
    });

    return {
      value1,
      modal,
      onShowModal,
      onClickAsyncButton,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'style/src/mixins';
@import 'style/src/function';

.title {
  color: $primary-color;
  margin-bottom: $spacer;
  line-height: $line-height-xxl;
}

.text-1 {
  font-size: $font-size;
  margin-bottom: $spacer-s;
}

.text-2 {
  font-size: $font-size-base;
  margin-bottom: $spacer-l;
}

.text-3 {
  font-size: $font-size-l;
  margin-bottom: $spacer-1;
}

.text-5 {
  font-size: $font-size-xl;
  margin-bottom: $spacer-2;
}

.text-6 {
  font-size: $font-size-xxl;
  margin-bottom: $spacer-5;
}

.g-card {
  @include g-m-t(20px);

  margin-bottom: square(10);
}
</style>
