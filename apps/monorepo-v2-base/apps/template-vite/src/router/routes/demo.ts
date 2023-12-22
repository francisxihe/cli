import appStation from '@/station';

export default [
  {
    path: '/demo',
    name: 'Demo',
    redirect: '/demo/list',
    meta: {
      title: 'Demo',
      icon: 'home',
      auth: [],
    },
    component: appStation.getModuleComponent('Layout', 'Default'),
    children: [
      {
        path: 'list',
        name: 'DemoTable',
        meta: {
          title: '表格',
          auth: [],
        },
        component: () => import('@/views/demo/list.vue'),
      },
      {
        path: 'form',
        name: 'DemoForm',
        meta: {
          title: '表单',
          auth: [],
        },
        component: () => import('@/views/demo/form-demo.vue'),
      },
    ],
  },
];
