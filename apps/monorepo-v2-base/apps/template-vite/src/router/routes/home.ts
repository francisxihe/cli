import appStation from '@/station';

export default [
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/list',
    meta: {
      title: 'Home',
      icon: 'home',
      auth: [],
    },
    component: appStation.getModuleComponent('Layout', 'Default'),
    children: [
      {
        path: 'list',
        name: 'HomePage',
        meta: {
          title: 'Home',
          auth: [],
        },
        component: () => import('@/views/home/list.vue'),
      },
      {
        path: 'https://google.com/',
        name: 'LinkPage',
        meta: {
          title: '外链',
          auth: [],
        },
      },
    ],
  },
];
