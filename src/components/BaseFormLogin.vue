<template>
  <form class="form premain__form-login" @submit.prevent="toAuth">
    <label class="form__label">
      <input class="form__input" :class="{ 'input-error': authErrors.emailError }" name="email"
        placeholder="Введите email" v-model="inputEmail" />
      <span class="login-error">
        {{ authErrors.emailError }}
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
    <span class="login-error" v-show="authErrors.unknownUserError">
      {{ authErrors.unknownUserError }}
    </span>
    <button class="form__btn-submit btn-reset">
      Войти
    </button>
  </form>
  <div class="wrapper-btn">
    <button class="btn-authorization btn-reset" @click="toRegistration('registration')">
      Регистрация
    </button>
  </div>
  <button class="btn-authorization btn-reset" @click="toRegistration('guard-login')">
    Служба
  </button>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSecurityStore } from '@/stores/useSecurity';

import useClearErrors from '@/composables/useClearErrors';
import useHiddenPassword from '@/composables/useHiddenPassword';

import type { IEmailError, IPasswordError, IUserError } from '@/interfaces/authErrors';

const router = useRouter();

const store = useSecurityStore();
const { isAuth, usersData } = storeToRefs(store);

const inputEmail = ref<string>('');
const inputPassword = ref<string>('');
const authErrors = reactive<{
  emailError: null | IEmailError | string,
  passwordError: null | IPasswordError | string,
  unknownUserError: null | IUserError | string,
}>({
  emailError: null,
  passwordError: null,
  unknownUserError: null
});

const toRegistration = (value: string) => router.push({ name: value });

const clearErrors = (): void => useClearErrors(authErrors);

const { toUncoverPassword, typeInput } = useHiddenPassword();

const toAuth = (): void => {
  usersData.value.map((user): void => {
    if (user.email === inputEmail.value && user.password === inputPassword.value) {
      isAuth.value = true;
      router.replace({ name: 'Main' });
    }

    if (user.email !== inputEmail.value) {
      authErrors.emailError = 'Введён неверный email';
    }

    if (user.password !== inputPassword.value) {
      authErrors.passwordError = 'Введён неверный пароль';
    }
  });

  clearErrors();
};
</script>
