<template>
  <header class="header">
    <div class="container header__container">

      <h2 class="header__title">
        <router-link :to="{ name: 'Main' }">
          Security App
        </router-link>
      </h2>

      <div class="header__dropdown-menu">
        <span class="header__login" @click="onDropDownMenu">
          {{ user?.fullname }}
        </span>

        <ul class="header__login-menu list-reset" :class="{ 'header__login-menu--active': isDropDownMenu === true }">
          <li class="header__login-menu-item">
            <router-link :to="{ name: 'Profile' }" class="header__login-menu-link">
              Профиль
            </router-link>
          </li>
          <li class="header__login-menu-item">
            <a class="header__login-menu-link" @click.prevent="userStore.outLog">
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUser';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const isDropDownMenu = ref<boolean>(false);

const onDropDownMenu = (): boolean => isDropDownMenu.value = !isDropDownMenu.value;
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 30px;

  &__container {
    padding: 25px;
    background-color: #2972f1;
    border-radius: 0 0 25px 25px;
  }

  &__dropdown-menu {
    margin-left: auto;
  }

  &__login {
    cursor: pointer;
    transition: border-bottom .3s ease-in-out;
  }

  &__login:hover {
    margin-bottom: -1px;
    border-bottom: 1px solid #000;
  }
}
</style>
