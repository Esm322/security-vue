import { ref, shallowRef } from 'vue';

import { defineStore, storeToRefs } from 'pinia';
import { useSecurityStore } from './useSecurity';

import { useRouter } from 'vue-router';

import { formatDate } from '@/helpers/formatDate';

import axios, { type AxiosResponse } from 'axios';

import type { IUsers, ITask, ICoordinates, IImmediateTask } from '@/interfaces/dataInterfaces';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const store = useSecurityStore();
  const { usersData } = storeToRefs(store);

  const cashedUser = localStorage.getItem('user');
  const cashedUserEmail = localStorage.getItem('email');
  const user = ref<IUsers | null>();
  const userEmail = ref<string>('');
  const coordinates = shallowRef<null | ITask[]>(null);
  const continousCoordinates = ref<null | IImmediateTask[]>(null);
  const isSended = ref<number>(1);

  user.value = cashedUser !== null ? JSON.parse(cashedUser) : {};
  userEmail.value = cashedUserEmail !== null ? JSON.parse(cashedUserEmail) : '';

  function saveUser() {
    user.value = usersData.value!.find((userItem) => userItem.email === userEmail.value);
    localStorage.setItem('email', JSON.stringify(userEmail.value));
    localStorage.setItem('user', JSON.stringify(user.value));
  }

  async function postTask(
    phone: string,
    fullname: string,
    description: string,
    date: Date,
    title: string,
    coordinates: ICoordinates[],
    clearForm: any,
  ) {
    try {
      const response: ITask = await axios.post('http://localhost:3000/api/task', {
        task_userFullname: fullname,
        task_userPhone: phone,
        task_date: formatDate(date),
        task_description: description,
        task_title: title,
        coordinates: coordinates,
      });

      isSended.value = 2;

      return response;
    } catch(err) {
      if (err) {
        isSended.value = 3;
      }
    } finally {
      clearForm();
    }
  }

  async function postImmediateTask(
    phone: string,
    fullname: string,
    date: Date,
    coordinates: ICoordinates[],
  ) {
    try {
      const response: IImmediateTask = await axios.post('http://localhost:3000/api/immediate_task', {
        task_userFullname: fullname,
        task_userPhone: phone,
        task_date: formatDate(date),
        coordinates: coordinates,
      });

      return response;
    } catch(err) {
      return err;
    }
  }

  async function patchImmediateTask(
    fullname: string,
    coordinates: ICoordinates[],
  ) {
    try {
      const response: AxiosResponse = await axios.patch('http://localhost:3000/api/immediate_task', {
        task_userFullname: fullname,
        coordinates: coordinates,
      });

      return response;
    } catch(err) {
      return err;
    }
  }

  async function closeImmediateTask(
    fullname: string,
    phone: string,
  ) {
    try {
      const response: AxiosResponse = await axios.patch('http://localhost:3000/api/user_close_immediate_task', {
        task_userFullname: fullname,
        task_userPhone: phone,
      });

      return response;
    } catch(err) {
      return err;
    }
  }

  function outLog(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    user.value = null;
    router.replace({ name: 'login' })
  };

  return {
    user,
    userEmail,
    cashedUser,
    saveUser,
    outLog,
    postTask,
    postImmediateTask,
    patchImmediateTask,
    closeImmediateTask,
    isSended,
    coordinates,
    continousCoordinates,
  };
})
