import sub1 from '@/views/sub/sub1.vue';

export default [
  {
    path: '/sub',
    redirect: '/sub/sub1',
    component: () => import('@/views/sub/index.vue'),
    meta: {
      title: '子页面',
      icon: 'fenxi_icon',
      auth: [],
      orderNo: 1,
      level: 1,
    },
    children: [
      {
        path: 'sub1',
        name: 'sub1',
        component: sub1,
        meta: { title: '子页面1', icon: '' },
      },
      {
        path: 'sub2',
        name: 'sub2',
        component: () => import('@/views/sub/sub2.vue'),
        meta: { title: '子页面2', icon: '' },
      },
    ],
  },
];
