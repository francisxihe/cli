import { Message, MessageBox } from 'element-ui';
import { cloneDeep } from 'lodash';
import { Ref } from 'vue';
import { Response } from '@/api/common';
import { ECommonEditorMode, ICommonEditor } from '../type';

export function useRowCurd<TPageItem extends Record<string, any>>(
  formEditorCtr: Ref<ICommonEditor<TPageItem | undefined>>,
  {
    deleteHandler,
    getTableData,
  }: {
    deleteHandler?: (id: number) => Promise<Response.Common<any>>;
    getTableData: Function;
  },
) {
  /** 新增 */
  const onClickCreate = () => {
    formEditorCtr.value = {
      visible: true,
      mode: ECommonEditorMode.Create,
      data: undefined,
    };
  };

  /** 新修改增 */
  const onClickRowUpdate = (row: TPageItem) => {
    formEditorCtr.value = {
      visible: true,
      mode: ECommonEditorMode.Update,
      data: cloneDeep(row),
    };
  };

  // 查看
  const onClickRowView = (row: TPageItem) => {
    formEditorCtr.value = {
      visible: true,
      mode: ECommonEditorMode.View,
      data: cloneDeep(row),
    };
  };

  // 删除
  async function onClickRowDelete(row: TPageItem) {
    if (!deleteHandler) return;
    await MessageBox.confirm('是否确认删除此条信息?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });

    await deleteHandler(row.id).then((res) => {
      if (res.code === 200) {
        Message.success('删除成功!');
        getTableData();
      } else {
        Message.error(res.msg || '删除失败!');
      }
    });
  }

  return {
    onClickCreate,
    onClickRowUpdate,
    onClickRowView,
    onClickRowDelete,
  };
}
