import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios, { type AxiosResponse } from 'axios';

import type { ITask, IImmediateTask } from '@/interfaces/dataInterfaces';

export const useGuardUserStore = defineStore('guardUser', () => {
  const securityTasksData = ref<ITask[] | null>([]);
  const securityAllTasksData = ref<ITask[] | null>([]);
  const securityImmediateTasksData = ref<IImmediateTask[] | null>([]);
  const securityTask = ref<ITask | null>(null);
  const securityImmediateTask = ref<IImmediateTask | null>(null);
  const isLoading = ref<boolean>(false);

  const securityTaskArray = computed<ITask[] | IImmediateTask[]>((): ITask[] | IImmediateTask[] => {
    return securityTask.value ? new Array(securityTask.value) : [];
  });

  const securityImmediateTaskArray = computed<ITask[] | IImmediateTask[]>((): ITask[] | IImmediateTask[] => {
    return securityImmediateTask.value ? new Array(securityImmediateTask.value) : [];
  });

  async function getAllTasksData(): Promise<ITask[]> {
    const response: AxiosResponse<ITask[]> = await axios.get('http://localhost:3000/api/all_tasks');

    return securityAllTasksData.value = response.data;
  };

  async function getTasksData(): Promise<ITask[]> {
    const response: AxiosResponse<ITask[]> = await axios.get('http://localhost:3000/api/tasks');

    return securityTasksData.value = response.data;
  };

  async function getImmediateTasksData(): Promise<IImmediateTask[]> {
    const response = await axios.get('http://localhost:3000/api/immediate_tasks');

    return securityImmediateTasksData.value = response.data;
  };

  async function patchTask(id: number): Promise<any> {
    try {
      const response: AxiosResponse = await axios.patch('http://localhost:3000/api/task', {
        task_id: id,
      })

      return response;
    } catch(err) {
      return err;
    }
  }

  async function patchImmediateTask(id: number): Promise<any> {
    try {
      const response: AxiosResponse = await axios.patch('http://localhost:3000/api/close_immediate_task', {
        task_id: id,
      })

      return response;
    } catch(err) {
      return err;
    }
  }

  return {
    securityTasksData,
    securityAllTasksData,
    securityImmediateTasksData,
    securityTask,
    securityImmediateTask,
    securityTaskArray,
    securityImmediateTaskArray,
    isLoading,
    getAllTasksData,
    getTasksData,
    getImmediateTasksData,
    patchTask,
    patchImmediateTask,
  };
})
