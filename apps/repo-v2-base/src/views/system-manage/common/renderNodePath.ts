import { SystemManage } from '@/api';

/** 获取部门的id路径用于cascader回显 */
export function renderNodePath(
  tree: (SystemManage.Dept.TreeNode | SystemManage.Permission.TreeNode)[],
  path: number[],
  id: number,
) {
  function recursion(_tree: (SystemManage.Dept.TreeNode | SystemManage.Permission.TreeNode)[], _path: number[]) {
    for (let i = 0; i < _tree.length; i++) {
      if (_tree[i].id === id) {
        _path = [..._path, _tree[i].id];
      }
      const children = _tree[i].children;
      if (children && children.length > 0) {
        recursion(children, [..._path, _tree[i].id]);
      }
    }
  }
  recursion(tree, path);

  return path;
}
