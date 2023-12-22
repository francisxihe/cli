import appStation from '@/station';

export default [
  {
    path: '/center/data',
    name: 'CenterData',
    redirect: '/center/data/license',
    meta: {
      title: '我的证件资料',
      icon: 'about',
      auth: [],
      orderNo: 4,
    },
    component: appStation.getModuleComponent('Layout', 'Page'),
    children: [
      {
        path: 'license',
        name: 'LicenseData',
        meta: {
          title: '我的证照',
          auth: [],
        },
        component: appStation.getModuleComponent('ModuleCenter', 'DataLicense'),
      },
      {
        path: 'material',
        name: 'MaterialData',
        meta: {
          title: '我的材料',
          auth: [],
        },
        component: appStation.getModuleComponent('ModuleCenter', 'DataMaterial'),
      },
    ],
  },
];
