import { Ref, ref } from 'vue';
import { SystemManage } from '@/api';
import { EPermissionType } from '@/api/systemManage/permission/enum';
import { ECommonEditorMode } from '../../type';
import { PermissionEditorProps } from './index.vue';
import { PermissionWeb } from '../type';

export function usePermissionEditor() {
  const initPermissionData:PermissionWeb.CreateWeb = {
    name: '',
    ordinal: undefined,
    location: '',
    type: EPermissionType.菜单,
    parentId: undefined,
    hidden: undefined,
  };

  const formEditorCtr: Ref<PermissionEditorProps> = ref({
    mode: ECommonEditorMode.Create,
    data: initPermissionData,
  });

  const completePermissionData = (permissionData: Partial<SystemManage.Permission.CreateWeb>) => {
    return {
      ...initPermissionData,
      ...permissionData,
    };
  };

  const resetFormEditorCtr = () => {
    formEditorCtr.value = {
      mode: ECommonEditorMode.Create,
      data: initPermissionData,
    };
  };

  return {
    formEditorCtr,
    resetFormEditorCtr,
    /** 获取或补全初始值 */
    completePermissionData,
  };
}
