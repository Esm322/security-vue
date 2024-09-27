<template>
  <BaseHeader />

  <main class="main">
    <div class="container">
      <nav class="nav">
        <ul class="list nav__list list-reset">
          <li class="list__item">
            Test
          </li>
        </ul>
      </nav>

      <BaseMap :coords="coordinates" v-model:coordinates="coordinates" />

      <BaseForm v-if="coordinates" v-model:description="description" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue';

import { useUserStore } from '@/stores/useUser';

import type { ICoords } from '@/interfaces/dataInterfaces';

import BaseMap from '@/components/BaseMap.vue';
import BaseForm from '@/components/BaseForm.vue';
import BaseHeader from '@/components/BaseHeader.vue';

const userStore = useUserStore();

const coordinates = shallowRef<null | ICoords[]>(null);
const description = ref<string>('');

onMounted(() => {
  userStore.getUser()
});
</script>

<style lang="scss" scoped></style>
