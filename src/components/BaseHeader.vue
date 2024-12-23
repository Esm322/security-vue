<template>
  <header class="header">
    <div class="container header__container">

      <h2 class="header__title">
        <router-link :to="{ name: 'Main' }" v-if="route.name === 'Profile' || route.name === 'Main'">
          Security App
        </router-link>

        <router-link :to="{ name: 'Security' }" v-else>
          Security App
        </router-link>
      </h2>

      <slot>

      </slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 30px;
}

.header__title {
  margin-right: auto;
}
</style>
