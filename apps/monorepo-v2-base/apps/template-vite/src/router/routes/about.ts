import appStation from '@/station';

export default [
  {
    path: '/about',
    name: 'About',
    redirect: '/about',
    meta: {
      title: 'About',
      icon: 'about',
      auth: [],
      orderNo: 3,
    },
    component: appStation.getModuleComponent('Layout', 'Default'),
    children: [
      {
        path: '',
        name: 'AboutPage',
        meta: {
          title: 'About',
          auth: [],
        },
        component: () => import('@/views/about/list.vue'),
      },
    ],
  },
];
