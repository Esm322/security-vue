import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { IUsers, IGuards } from '@/interfaces/dataInterfaces';

export const useSecurityStore = defineStore('security', () => {
  const isAuth = ref<boolean>(false);
  const isAuthSecurity = ref<boolean>(false);
  const usersData = ref<IUsers[]>([
    {
      email: '1',
      fullname: 'Example Example Example',
      password: '1'
    }
  ]);
  const guardsData = ref<IGuards[]>([
    {
      guardLogin: '1',
      guardFullname: 'Example Example Example',
      password: '1'
    }
  ]);

  return {
    isAuth,
    isAuthSecurity,
    usersData,
    guardsData,
  }
})
