import appStation from '@/station';

export default [
  {
    path: '/center/info',
    name: 'CenterInfo',
    redirect: '/center/info/basic',
    meta: {
      title: '我的信息',
      icon: 'about',
      auth: [],
      orderNo: 2,
    },
    component: appStation.getModuleComponent('Layout', 'Page'),
    children: [
      {
        path: 'basic',
        name: 'BasicInfo',
        meta: {
          title: '基本信息',
          auth: [],
        },
        component: appStation.getModuleComponent('ModuleCenter', 'InfoBasic'),
      },
      {
        path: 'avatar',
        name: 'AvatarManage',
        meta: {
          title: '头像管理',
          auth: [],
        },
        component: appStation.getModuleComponent('ModuleCenter', 'InfoAvatar'),
      },
      {
        path: 'menu1',
        name: 'AuthManage',
        meta: {
          title: '授权管理',
          auth: [],
        },
        redirect: '/center/info/menu1/menu1-1',
        component: () => import('@/views/menus/menu1/index.vue'),
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/menus/menu1/menu1-1/index.vue'),
            name: 'AuthManage1-1',
            meta: { title: 'Menu 1-1' },
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/menus/menu1/menu1-2/index.vue'),
            name: 'AuthManage1-2',
            meta: { title: 'Menu 1-2' },
          },
        ],
      },
    ],
  },
];
