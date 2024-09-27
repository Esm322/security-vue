import { ref } from 'vue';
import { defineStore } from 'pinia';

import axios, { type AxiosResponse } from 'axios';

import type { IUsers, IGuards, ITask } from '@/interfaces/dataInterfaces';

export const useSecurityStore = defineStore('security', () => {
  const isAuth = ref<boolean>(false);
  const isAuthSecurity = ref<boolean>(false);
  const usersData = ref<IUsers[] | null>([
    {
      id: 1,
      email: '1',
      fullname: 'Example Example Example',
      password: '1'
    }
  ]);
  const guardsData = ref<IGuards[] | null>([
    {
      id: 1,
      guardLogin: '1',
      guardFullname: 'Example Example Example',
      password: '1'
    }
  ]);
  const securityTasksData = ref<ITask[] | null>([]);

  function getTasksData() {
    return axios.get('/api/tasks')
      .then((response: AxiosResponse) => securityTasksData.value = response.data);
  };

  return {
    isAuth,
    isAuthSecurity,
    usersData,
    guardsData,
    securityTasksData,
    getTasksData,
  }
})
