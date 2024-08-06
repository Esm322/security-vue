<template>
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
import { shallowRef, ref } from 'vue';

import type { LngLat } from '@yandex/ymaps3-types';

import BaseMap from '@/components/BaseMap.vue';
import BaseForm from '@/components/BaseForm.vue';

type TCoords = {
  coordinates: LngLat,
  screenCoordinates: number[],
}

const coordinates = shallowRef<null | TCoords[]>(null);
const description = ref<string>('');
</script>
