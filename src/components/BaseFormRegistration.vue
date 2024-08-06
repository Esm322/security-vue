<template>
  <form class="form premain__form-registration" @submit.prevent="toRegistrate">
    <label class="form__label">
      <input class="form__input" :class="{ 'input-error': registrationErrors.emailError }" name="email"
        placeholder="Введите email" v-model="email" />
      <span class="login-error" v-show="registrationErrors.emailError">
        {{ registrationErrors.emailError }}
      </span>
    </label>
    <label class="form__label">
      <input class="form__input" :class="{ 'input-error': registrationErrors.fullnameError }" name="fullname"
        placeholder="Введите ФИО" v-model="fullname" />
      <span class="login-error" v-show="registrationErrors.fullnameError">
        {{ registrationErrors.fullnameError }}
      </span>
    </label>
    <label class="form__label">
      <input :type="typeInput" class="form__input" :class="{ 'input-error': registrationErrors.passwordError }"
        name="password" placeholder="Придумайте пароль" v-model="password" />
      <span class="login-error" v-show="registrationErrors.passwordError">
        {{ registrationErrors.passwordError }}
      </span>
    </label>
    <label class="form__label">
      <input :type="typeInput" class="form__input" :class="{ 'input-error': registrationErrors.repeatedPasswordError }"
        name="repeatPassword" placeholder="Повторите пароль" v-model="repeatedPassword" />
      <span class="password-hidden" @click="toUncoverPassword">
        Скрыть
      </span>
      <span class="login-error" v-show="registrationErrors.repeatedPasswordError">
        {{ registrationErrors.repeatedPasswordError }}
      </span>
    </label>
    <button class="form__btn-submit btn-reset">
      Зарегистрироваться
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSecurityStore } from '@/stores/useSecurity';

import useClearErrors from '@/composables/useClearErrors';
import useValidRegistartion from '@/composables/useValidRegistration';
import useHiddenPassword from '@/composables/useHiddenPassword';

import type { IEmailError, IPasswordError, IFullnameError, IRepeatedPasswordError } from '@/interfaces/authErrors';

const router = useRouter();
const store = useSecurityStore();
const { usersData } = storeToRefs(store);

const email = ref<string>('');
const fullname = ref<string>('');
const password = ref<string>('');
const repeatedPassword = ref<string>('');
const registrationErrors = reactive<{
  emailError: null | IEmailError | string,
  passwordError: null | IPasswordError | string,
  fullnameError: null | IFullnameError | string,
  repeatedPasswordError: null | IRepeatedPasswordError | string,
}>({
  emailError: null,
  passwordError: null,
  fullnameError: null,
  repeatedPasswordError: null,
});

const isRegistrationErrors = computed((): boolean => {
  return (
    !registrationErrors.emailError &&
    !registrationErrors.fullnameError &&
    !registrationErrors.passwordError &&
    !registrationErrors.repeatedPasswordError
  );
});

const timerTransition = (): number => setTimeout(() => router.replace({ name: 'login' }), 2000);

const clearErrors = (): void => useClearErrors(registrationErrors);

const isInputsValues = (): boolean => useValidRegistartion(email, fullname, password, repeatedPassword);

const { toUncoverPassword, typeInput } = useHiddenPassword();

const toRegistrate = (): void => {
  if (isRegistrationErrors.value && isInputsValues()) {
    usersData.value.push({
      email: email.value,
      fullname: fullname.value,
      password: password.value
    });

    timerTransition();
  }

  if (!email.value) {
    registrationErrors.emailError = 'Введите email';
  }

  if (!fullname.value) {
    registrationErrors.fullnameError = 'Введите ФИО';
  }

  if (!password.value) {
    registrationErrors.passwordError = 'Придумайте пароль';
  }

  if (password.value !== repeatedPassword.value) {
    registrationErrors.repeatedPasswordError = 'Пароли не совпадают';
  }

  if (!isRegistrationErrors.value) {
    clearErrors();
  }
};
</script>
