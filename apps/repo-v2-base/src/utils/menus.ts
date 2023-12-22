import { isExternal } from '@/utils/validate';

export const getMenuList = (list: any, basePath?: string) => {
  if (!list) return [];
  // 排序
  list.sort((a: any, b: any) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0));

  return list
    .map((item: any) => {
      let path = basePath ? `${basePath}/${item.path}` : item.path;
      // 如果是外链, 则直接返回
      if (isExternal(item.path)) path = item.path;
      return {
        ...item,
        path,
        children: getMenuList(item.children, path),
      };
    })
    .filter((item: any) => item.meta?.hidden !== true);
};

/**
 * 递归查找菜单是否存在
 * @param list 菜单列表
 * @param route 路由
 */
export const findTab = (list: any[], route: any) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].path === route.path) {
      return true;
    }
    if (list[i].children && list[i].children.length > 0) {
      if (findTab(list[i].children, route)) {
        return true;
      }
    }
  }
  return false;
};
