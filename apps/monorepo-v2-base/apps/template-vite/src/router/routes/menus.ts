import appStation from '@/station';

export default [
  {
    path: '/menus',
    name: 'Menus',
    redirect: '/menus/menu1/index',
    meta: {
      title: '多级菜单',
      icon: 'home',
      auth: [],
    },
    component: appStation.getModuleComponent('Layout', 'Default'),
    children: [
      {
        path: 'menu1',
        name: 'Menu1Page',
        meta: {
          title: 'Menu1Page',
          auth: [],
        },
        component: () => import('@/views/menus/menu1/index.vue'),
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/menus/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'Menu 1-1' },
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/menus/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: { title: 'Menu 1-2' },
          },
        ],
      },
      {
        path: 'menu2',
        name: 'Menu2Page',
        meta: {
          title: 'Menu2Page',
          auth: [],
        },
        component: () => import('@/views/menus/menu2/index.vue'),
      },
    ],
  },
];
