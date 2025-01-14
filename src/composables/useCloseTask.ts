import { useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useGuardUserStore } from '@/stores/useGuardUser';

import type { ITask, IImmediateTask } from '@/interfaces/dataInterfaces';

export default function useCloseTask() {
  const router = useRouter();
  const store = useGuardUserStore();
  const { isLoading } = storeToRefs(store)

  const closeTask = (callbackClose: any, task: ITask | IImmediateTask) => {
    try {
      isLoading.value = true;
      callbackClose(task.task_id);

      setTimeout(() => {
        router.replace({ name: 'Security' })
      }, 1000)
    } catch(err) {
      isLoading.value = false;
    }
  };

  return {
    closeTask,
  }
};
