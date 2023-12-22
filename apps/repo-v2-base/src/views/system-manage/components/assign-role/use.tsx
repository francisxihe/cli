import { Ref, ref } from 'vue';
import { Props } from './index.vue';

export function useAssignRole({ onSubmit }: { onSubmit: (userIdList: number[]) => Promise<void> }) {
  const assignRoleCtr: Ref<
    Omit<Props, 'data'> & {
      data: Props['data'] | undefined;
    }
  > = ref({
    visible: false,
    data: undefined,
    onSubmit,
  });

  return {
    assignRoleCtr,
  };
}
