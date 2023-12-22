import appStation from '@/station';

export default [
  {
    path: '/center/affairs',
    name: 'CenterAffairs',
    redirect: '/center/affairs/manage',
    meta: {
      title: '我的事务',
      icon: 'about',
      auth: [],
      orderNo: 3,
    },
    component: appStation.getModuleComponent('Layout', 'Page'),
    children: [
      {
        path: 'manage',
        name: 'ManageAffairs',
        meta: {
          title: '我的办件',
          auth: [],
        },
        component: appStation.getModuleComponent('ModuleCenter', 'AffairsManage'),
      },
      {
        path: 'consult',
        name: 'ConsultAffairs',
        meta: {
          title: '咨询投诉',
          auth: [],
        },
        component: appStation.getModuleComponent('ModuleCenter', 'AffairsConsult'),
      },
    ],
  },
];
