import VueRouter from 'vue-router';
import { EPermissionType } from '@/api/system/permission/enum';
import { UserPermission, UserPermissionWeb } from '@/api/system/permission';
import { useUserStore } from '@/store/modules/user';

const modules = import.meta.glob('@/views/**');

export const asyncPermissonRouter = async (router: VueRouter) => {
  const userStore = useUserStore();

  const permissionRouterList = userStore.permissionList.filter(permission => permission.type === EPermissionType.菜单);

  for (let curLevel = 1; permissionRouterList.filter(item => item.level === curLevel).length > 0; curLevel++) {
    if (curLevel === 1) {
      permissionRouterList
        .filter(item => item.level === 1)
        .forEach(item => {
          router.addRoute({
            path: item.path,
            name: item.name,
            // TODO 层级调整
            component: () => import('@/layout/manage/index.vue'),
            redirect: item.redirect,
            meta: {
              title: item.title,
            },
          });
        });
    } else {
      permissionRouterList
        .filter(item => item.level === curLevel)
        .forEach(item => {
          let component;
          // 组件文件读取顺序/a/b.vue， /a/b.tsx，/a/b/index.vue，/a/b/index.tsx
          if (modules[`/src/views${item.path}.vue`]) {
            component = modules[`/src/views${item.path}.vue`];
          } else if (modules[`/src/views${item.path}.tsx`]) {
            component = modules[`/src/views${item.path}.tsx`];
          } else if (modules[`/src/views${item.path}/index.vue`]) {
            component = modules[`/src/views${item.path}/index.vue`];
          } else if (modules[`/src/views${item.path}/index.tsx`]) {
            component = modules[`/src/views${item.path}/index.tsx`];
          }

          router.addRoute(item.parentName, {
            path: item.path,
            name: item.name,
            component,
            redirect: item.redirect,
            meta: {
              title: item.title,
            },
          });
        });
    }
    curLevel++;
  }

  // let curLevel = 1;

  // while (permissionRouterList.filter(item => item.level === curLevel).length > 0) {}
};

export const formatPermissionList = (permissionList: UserPermission[]): UserPermissionWeb[] => {
  return permissionList.map(permission => {
    const pathArr = permission.location.split('/').filter(item => item !== '');
    const parentPathArr = pathArr.slice(0, pathArr.length - 1);

    return {
      name: pathArr.join('-'),
      path: permission.location,
      title: permission.name,
      level: pathArr.length,
      type: permission.type,
      ordinal: permission.ordinal,
      redirect: permission.redirect,
      hidden: permission.hidden,
      parentName: parentPathArr.length > 0 ? parentPathArr.join('-') : '',
      children: [],
    };
  });
};
