import appStation from '@/station';

export default [
  {
    path: '/center',
    name: 'CenterSpace',
    redirect: '/center/space',
    meta: {
      title: '个人空间',
      icon: 'about',
      auth: [],
      orderNo: 1,
    },
    component: appStation.getModuleComponent('Layout', 'Page'),
    children: [
      {
        path: 'space',
        name: 'SpacePage',
        meta: {
          title: 'Center',
          auth: [],
        },
        component: appStation.getModuleComponent('ModuleCenter', 'Space'),
      },
    ],
  },
];
