import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGuardUserStore } from '@/stores/useGuardUser';

export default function useChart() {
  const store = useGuardUserStore();
  const { securityAllTasksData } = storeToRefs(store);

  const labels = ['Закрыте задачи', 'Открытые задачи'];

  const completedTasks = computed(() => {
    return securityAllTasksData.value
      ? securityAllTasksData.value!.filter((item) => item.task_status === true).length : 0;
  })

  const uncompletedTasks = computed(() => {
    return securityAllTasksData.value
      ? securityAllTasksData.value!.filter((item) => item.task_status === false).length : 0;
  })

  const chartConfig = computed(() => {
    return {
      labels: labels,
      datasets: [
        {
          backgroundColor: ['#41B883', '#DD1B16'],
          data: [completedTasks.value, uncompletedTasks.value]
        }
      ]
    }
  });

  return {
    chartConfig,
    completedTasks,
    uncompletedTasks,
  };
}
