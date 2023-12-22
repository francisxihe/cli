export default [
  {
    path: '/creditSupervision',
    component: () => import('@/views/default.vue'),
    redirect: '/creditSupervision/creditWarningService',
    props: {
      disableHeader: true,
      disablePermission: true,
      disableBreadcrumb: true,
    },
    meta: {
      title: '信用监管分析',
      icon: 'fenxi_icon',
      auth: [],
      orderNo: 1,
      level: 1,
    },
    // children: [
    //   {
    //     path: 'jgdxgl',
    //     name: 'jgdxgl',
    //     component: () => import('@/views/supervisionInKeyAreas/zfysgl/jgdxgl.vue'),
    //     meta: { title: '监管对象管理', icon: '' },
    //     children: [],
    //   },
    //   {
    //     path: 'zfrygl',
    //     name: 'zfrygl',
    //     component: () => import('@/views/supervisionInKeyAreas/zfysgl/zfrygl.vue'),
    //     meta: { title: '执法人员管理', icon: '' },
    //     children: [],
    //   },
    //   {
    //     path: 'zfryglDetail',
    //     name: 'zfryglDetail',
    //     meta: { title: '执法人员管理-详情', hidden: true, icon: '' },
    //     component: () => import('@/views/supervisionInKeyAreas/zfysgl/zfryglDetail.vue'),
    //   },
    //   {
    //     path: 'sxgl',
    //     name: 'sxgl',
    //     component: () => import('@/views/supervisionInKeyAreas/zfysgl/index.vue'),
    //     meta: { title: '事项管理', icon: '' },
    //     children: [
    //       {
    //         path: 'xksxgl',
    //         name: 'xksxgl',
    //         component: () => import('@/views/supervisionInKeyAreas/zfysgl/xksxgl.vue'),
    //         meta: { title: '许可事项管理', icon: '' },
    //       },
    //       {
    //         path: 'jgsxgl',
    //         name: 'jgsxgl',
    //         component: () => import('@/views/supervisionInKeyAreas/zfysgl/jgsxgl.vue'),
    //         meta: { title: '监管事项管理', icon: '' },
    //       },
    //       {
    //         path: 'ccsxgl',
    //         name: 'ccsxgl',
    //         component: () => import('@/views/supervisionInKeyAreas/zfysgl/ccsxgl.vue'),
    //         meta: { title: '抽查事项管理', icon: '' },
    //       },
    //     ],
    //   },
    // ],
  },
];
