import { ref } from 'vue';

export default function useHiddenPassword() {
  const isPasswordHidden = ref<boolean>(true);
  const typeInput = ref<string>('password');


  const toUncoverPassword = (): void => {
    if (isPasswordHidden.value) {
      typeInput.value = '';
      isPasswordHidden.value = false
    } else {
      typeInput.value = 'password';
      isPasswordHidden.value = true;
    }
  };

  return {
    toUncoverPassword,
    typeInput
  };
};
