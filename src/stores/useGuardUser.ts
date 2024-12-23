import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios, { type AxiosResponse } from 'axios';

import type { ITask, IImmediateTask } from '@/interfaces/dataInterfaces';

export const useGuardUserStore = defineStore('guardUser', () => {
  const securityTasksData = ref<ITask[] | null>([]);
  const securityAllTasksData = ref<ITask[] | null>([]);

  const securityImmediateTasksData = ref<IImmediateTask[] | null>([]);

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
    const response: AxiosResponse = await axios.patch('http://localhost:3000/api/task', {
      task_id: id,
    })

    return response;
  }

  async function patchImmediateTask(id: number): Promise<any> {
    const response: AxiosResponse = await axios.patch('http://localhost:3000/api/close_immediate_task', {
      task_id: id,
    })

    return response;
  }

  return {
    securityTasksData,
    securityAllTasksData,
    securityImmediateTasksData,
    getAllTasksData,
    getTasksData,
    getImmediateTasksData,
    patchTask,
    patchImmediateTask,
  };
})
