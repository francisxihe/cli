/* eslint-disable @typescript-eslint/ban-ts-comment */
// TODO: row 类型定义
export const getPath = (row: any) => row.redirect || row.path;

export const getMenuList = (list: any) => {
  if (!list) return [];
  // 排序
  list.sort((a: any, b: any) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0));

  return list
    .map((item: any) => {
      return {
        ...item,
        children: getMenuList(item.children),
      };
    })
    .filter((item: any) => item.meta?.hidden !== true);
};

export const filterMenu = (baseMenu: any) => {
  // @ts-ignore
  const permissinMenu = JSON.parse(localStorage.getItem('menu'));

  const pathMap = permissinMenu.map((item: any) => {
    return '/' + item.location;
  });

  baseMenu.forEach((item: any) => {
    if (pathMap.indexOf(item.path) === -1) {
      item.meta.hidden = true;
    }
  });
  return baseMenu;
};

export function getRootRoutesTree(allRoutes: any[]) {
  function mountChildrenRoute(parentRoute: any) {
    allRoutes.forEach((route) => {
      if (route.parent && route.parent.path === parentRoute.path) {
        if (!parentRoute.children) {
          parentRoute.children = [route];
        } else {
          // 子菜单去重
          const childPathMap = parentRoute.children.map((child: { path: any; }) => {
            return child.path;
          });
          if (childPathMap.indexOf(route.path) === -1) {
            parentRoute.children.push(route);
          }
        }
        mountChildrenRoute(route);
      }
    });
  }

  const rootRoutes = allRoutes.filter((item) => item.meta.level === 1);
  if (rootRoutes) {
    rootRoutes.forEach((rootRoute) => {
      mountChildrenRoute(rootRoute);
    });
  }
  return rootRoutes;
}
