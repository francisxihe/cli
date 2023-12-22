import appStation from '@/station';

export default [
  {
    path: '/superviseVisualization',
    component: appStation.getModuleComponent('Layout', 'Default'),
    redirect: '/superviseVisualization/supervise',
    meta: {
      title: '执法监管可视化展示',
      icon: 'jiangcheng_icon',
      auth: [],
      orderNo: 5,
      level: 1,
    },
    children: [
      {
        path: 'supervise',
        name: 'supervise',
        component: () => import('@/views/superviseVisualization/supervise/index.vue'),
        meta: {
          title: '执法监管可视化展示',
        },
      },
      {
        path: 'superbiseFollow',
        name: 'superbiseFollow',
        component: () => import('@/views/superviseVisualization/superbiseFollow/index.vue'),
        meta: {
          title: '监管事件跟踪分析',
        },
      },
    ],
  },
];
