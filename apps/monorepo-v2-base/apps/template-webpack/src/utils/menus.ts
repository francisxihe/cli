import { isExternal } from 'utils';

// TODO: row 类型定义
export const getPath = (row: any) => row.redirect || row.path;

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

export const filterMenu = (baseMenu: any) => {
  // @ts-ignore
  const permissinMenu = JSON.parse(localStorage.getItem('menu'));
  const pathMap = (permissinMenu || []).map((item: { location: string }) => {
    return '/' + item.location;
  });

  baseMenu.forEach((item: any) => {
    if (pathMap.indexOf(item.path) == -1) {
      item.meta.hidden = true;
    }
  });
  return baseMenu;
};
