<template>
  <label class="profile__label">
    <input class="profile__input" :placeholder="props.placeholder" :name="props.name"
      :type="props.name === 'password' ? typeInput : props.type" v-model="setModelValue">
    <span class="password-hidden" @click="toUncoverPassword" v-show="props.name === 'password'">
      Скрыть
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import useHiddenPassword from '@/composables/useHiddenPassword';

const props = defineProps<{
  placeholder: string,
  name: string,
  type: string,
  modelValue: string,
}>();

const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void,
}>();

const setModelValue = computed({
  get: (): string => props.modelValue,
  set: (value: string): void => emits('update:modelValue', value),
});

const { toUncoverPassword, typeInput } = useHiddenPassword();
</script>

<style lang="scss" scoped>
.profile__label {
  position: relative;
  margin-bottom: 10px;
  width: 100%;
}

.profile__input {
  padding: 10px;
  width: 100%;
}

.password-hidden {
  top: 0px;
  right: 5px;
}
</style>
