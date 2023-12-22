import { Ref, ref } from 'vue';
import { ECommonEditorMode } from '../../type';
import { DeptEditorProps } from './index.vue';
import { DeptWeb } from '../type';

export function useDeptEditor() {
  const initData = {
    name: '',
    leader: undefined,
    phone: undefined,
    leaderId: undefined,
    parentId: 1,
    ordinal: undefined,
  };

  const formEditorCtr: Ref<DeptEditorProps> = ref({
    mode: ECommonEditorMode.Create,
    data: initData,
  });

  const completeInitData = (data: Partial<DeptWeb.CreateWeb>) => {
    return {
      ...initData,
      ...data,
    };
  };

  const resetFormEditorCtr = (mergeData?: Partial<DeptWeb.CreateWeb>) => {
    formEditorCtr.value = {
      mode: ECommonEditorMode.Create,
      data: {
        ...initData,
        ...mergeData,
      },
    };
  };

  return {
    formEditorCtr,
    resetFormEditorCtr,
    completeInitData,
  };
}
