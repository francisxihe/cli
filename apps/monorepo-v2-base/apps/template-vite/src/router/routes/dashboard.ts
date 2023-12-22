import appStation from '@/station';

export default [
  {
    path: '/dashboard',
    component: appStation.getModuleComponent('Layout', 'Default'),
    redirect: '/dashboard',
    meta: {
      title: 'Dashboard1',
      icon: 'dashboard',
      auth: [],
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: appStation.getModuleComponent('ModuleDashboard', 'Dashboard'),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },
];
