import { Ref, ref } from 'vue';
import { Props } from './index.vue';

export function useAssignUser({ onSubmit }: { onSubmit: (userIdList: number[]) => Promise<void> }) {
  const assignUserCtr: Ref<
    Omit<Props, 'data'> & {
      data: Props['data'] | undefined;
    }
  > = ref({
    visible: false,
    data: undefined,
    onSubmit,
  });

  return {
    assignUserCtr,
  };
}
