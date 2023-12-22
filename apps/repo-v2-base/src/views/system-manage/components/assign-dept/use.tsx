import { Ref, ref } from 'vue';
import { Props } from './index.vue';

export function useAssignDept({ onSubmit }: { onSubmit: (deptIdList: number[]) => Promise<void> }) {
  const assignDeptCtr: Ref<
    Omit<Props, 'data'> & {
      data: Props['data'] | undefined;
    }
  > = ref({
    visible: false,
    data: undefined,
    onSubmit,
  });

  return {
    assignDeptCtr,
  };
}
