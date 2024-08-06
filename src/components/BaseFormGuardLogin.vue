<template>
  SECURITY
  <form class="form premain__form-login" @submit.prevent="toAuth">
    <label class="form__label">
      <input class="form__input" :class="{ 'input-error': authErrors.guardLoginError }" name="login"
        placeholder="Введите логин" v-model="inputLogin" />
      <span class="login-error">
        {{ authErrors.guardLoginError }}
      </span>
    </label>
    <label class="form__label">
      <input :type="typeInput" class="form__input" :class="{ 'input-error': authErrors.passwordError }" name="password"
        placeholder="Введите пароль" v-model="inputPassword" />
      <span class="password-hidden" @click="toUncoverPassword">
        Скрыть
      </span>
      <span class="login-error">
        {{ authErrors.passwordError }}
      </span>
    </label>
    <button class="form__btn-submit btn-reset">
      Войти
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSecurityStore } from '@/stores/useSecurity';

import useHiddenPassword from '@/composables/useHiddenPassword';
import useClearErrors from '@/composables/useClearErrors';

import type { IPasswordError, IGuardLoginError } from '@/interfaces/authErrors';

const router = useRouter();
const store = useSecurityStore();
const { guardsData, isAuth } = storeToRefs(store);

const { toUncoverPassword, typeInput } = useHiddenPassword();

const clearErrors = () => useClearErrors(authErrors);

const inputLogin = ref<string>('');
const inputPassword = ref<string>('');
const authErrors = reactive<{
  guardLoginError: null | IGuardLoginError | string,
  passwordError: null | IPasswordError | string,
}>({
  guardLoginError: null,
  passwordError: null,
});

const toAuth = (): void => {
  guardsData.value.map((guard): void => {
    if (guard.guardLogin === inputLogin.value && guard.password === inputPassword.value) {
      isAuth.value = true;
      router.replace({ name: 'Security' });
    }

    if (guard.guardLogin !== inputLogin.value) {
      authErrors.guardLoginError = 'Введён неверный логин';
    }

    if (guard.password !== inputPassword.value) {
      authErrors.passwordError = 'Введён неверный пароль';
    }
  });

  clearErrors();
};
</script>
