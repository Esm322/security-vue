import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { IUsers, IGuards } from '@/interfaces/dataInterfaces';

export const useSecurityStore = defineStore('security', () => {
  const usersData = ref<IUsers[] | null>([
    {
      id: 1,
      email: '1',
      phone: '+79999999999',
      fullname: 'Example Example Example',
      password: '1'
    },
    {
      id: 2,
      email: '2',
      phone: '+79999222222',
      fullname: 'Example2 Example2 Example2',
      password: '2'
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

  return {
    usersData,
    guardsData,
  }
})
