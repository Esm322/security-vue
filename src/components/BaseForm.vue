<template>
  <form class="form"
    @submit.prevent="store.postTask(user!.phone, user!.fullname, currDescription, currDate, currTitle, coordinates!, clearForm)">
    <label class="form__label">
      <input class="form__input" type="text" placeholder="Укажите вид правонарушения (Н.п.: драка, шум...)" name="title"
        v-model="currTitle">
    </label>
    <label class="form__label">
      <textarea wrap="hard" cols="60" name="description" class="form__description" placeholder="Опишите правонарушение"
        required v-model="currDescription"></textarea>
    </label>
    <button class="form__btn-submit btn-reset">
      Отправить
    </button>
    <p class="form__text-success" v-if="isSended === 2">
      Отправлено!
    </p>
    <p class="form__text-unsuccess" v-else-if="isSended === 3">
      Не отправлено!
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUser';

const store = useUserStore();

const { user, isSended, coordinates } = storeToRefs(store);

const currDescription = ref<string>('');
const currTitle = ref<string>('');
const currDate = new Date();

const clearForm = () => {
  setTimeout(() => {
    currDescription.value = '';
    currTitle.value = '';
    isSended.value = 1;
    coordinates.value = null;
  }, 2000)
};
</script>
