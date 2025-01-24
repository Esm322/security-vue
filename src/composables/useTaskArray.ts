import { computed } from "vue";

import { useGuardUserStore } from "@/stores/useGuardUser";
import { storeToRefs } from "pinia";

import type { ITask, IImmediateTask } from "@/interfaces/dataInterfaces";

export default function useTaskArray() {
  const store = useGuardUserStore();
  const { securityTask, securityImmediateTask } = storeToRefs(store);

  const securityTaskArray = computed<ITask[]>((): ITask[] => securityTask.value ? new Array(securityTask.value) : []);

  const securityImmediateTaskArray = computed<IImmediateTask[]>((): IImmediateTask[] => securityImmediateTask.value ? new Array(securityImmediateTask.value) : []);

  return {
    securityTaskArray,
    securityImmediateTaskArray,
  };
}
