import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

import { useSecurityStore } from './useSecurity';

import { useRouter } from 'vue-router';

import type { IUsers } from '@/interfaces/dataInterfaces';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const store = useSecurityStore();
  const { usersData, isAuth } = storeToRefs(store);

  const user = ref<IUsers | null>(null);
  const userEmail = ref<string>('');

  function getUser(): void {
    if (userEmail.value) {
      user.value = usersData.value!.find((userData: IUsers) => userData.email === userEmail.value);
    }
  };

  function changeUser(
    id: number,
    // email?: string,
    fullname?: string,
    // password?: string,
  ): void {
    usersData.value!.forEach((userData: IUsers) => {
      if (userData.id === id) {
        // email ? userData.email = email : userData.email;
        fullname ? userData.fullname = fullname : userData.fullname;
        // password ? userData.password = password : userData.password;
      }
    })
  }

  function outLog(): void {
    isAuth.value = false;
    user.value = null;
    userEmail.value = '';
    router.replace({ name: 'login' })
  };

  return {
    user,
    userEmail,
    getUser,
    outLog,
    changeUser,
  };
})
