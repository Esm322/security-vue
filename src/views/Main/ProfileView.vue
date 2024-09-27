<template>
  <BaseHeader />

  <main class="main">
    <div class="container profile__container">
      <ul class="profile__list list-reset">
        <li class="profile__item">
          <UIInput :type="'text'" :name="'email'" :placeholder="'Введите почту'" v-model="currUser.email" />
        </li>
        <li class="profile__item">
          <UIInput :type="'text'" :name="'fullname'" :placeholder="'Введите ФИО'" v-model="currUser.fullname" />
        </li>
        <li class="profile__item">
          <UIInput :type="'password'" :name="'password'" :placeholder="'Введите пароль'" v-model="currUser.password" />
        </li>
      </ul>

      <button class="profile__btn-save btn-reset" @click="userStore.changeUser(currUser.id, currUser.fullname)">
        Сохранить
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUser';

import BaseHeader from '@/components/BaseHeader.vue';
import UIInput from '@/components/UI/UIInput.vue';

import type { IUsers } from '@/interfaces/dataInterfaces';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const currUser = ref<IUsers>(JSON.parse(JSON.stringify(user.value)));

onUnmounted(() => {
  currUser.value = JSON.parse(JSON.stringify(user.value))
});
</script>

<style scoped lang="scss">
.profile__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile__form {
  width: 500px;
}

.profile__list,
.profile__item {
  width: 100%;
}
</style>
