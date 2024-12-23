<template>
  <BaseMap :coordinates="coordinates">
    <yandex-map v-model="map" :settings="{
      location: {
        center: [38.9059877160469, 45.09556471071164],
        zoom: 16,
      },
    }" width="100%" height="500px">
      <yandex-map-listener :settings="{ onClick: setCoordinates }" />
      <yandex-map-default-features-layer />
      <yandex-map-controls :settings="{ position: 'right' }">
        <yandex-map-zoom-control />
      </yandex-map-controls>
      <yandex-map-marker v-for="(marker, index) in coordinates" :key="index" :settings="marker"
        position="top-center left-center">
        <div class="marker"></div>
      </yandex-map-marker>
      <template>
        <yandex-map-marker v-for="(marker, index) in currPosition" :key="index" :settings="marker"
          position="top-center left-center">
          <div class="marker-current"></div>
        </yandex-map-marker>
      </template>
      <yandex-map-default-scheme-layer />
    </yandex-map>
  </BaseMap>
</template>

<script setup lang="ts">
import { shallowRef, onMounted } from 'vue';

import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapListener,
  YandexMapMarker,
  YandexMapControls,
  YandexMapZoomControl,
} from 'vue-yandex-maps';

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUser';

import useCurrentPosition from '@/composables/useCurrentPosition';

import BaseMap from './BaseMap.vue';

import type { YMap } from '@yandex/ymaps3-types';

const store = useUserStore();
const { coordinates } = storeToRefs(store);

const map = shallowRef<null | YMap>();
const { currPosition, getPosition } = useCurrentPosition();

const setCoordinates = (object: any, event: any) => coordinates.value = [event];

onMounted(() => {
  getPosition();
})
</script>
