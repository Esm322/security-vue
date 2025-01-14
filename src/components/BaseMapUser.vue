<template>
  <BaseMap :coordinates="coordinates" v-if="props.cashedPosition.length > 0">
    <yandex-map v-model="map" :settings="{
      location: {
        center: props.cashedPosition,
        zoom: 17,
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
import { shallowRef } from 'vue';

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

import type { LngLat, YMap } from '@yandex/ymaps3-types';

const props = defineProps<{
  cashedPosition: LngLat,
}>();

const store = useUserStore();
const { coordinates } = storeToRefs(store);

const map = shallowRef<null | YMap>();
const { currPosition } = useCurrentPosition();

const setCoordinates = (object: any, event: any) => coordinates.value = [event];
</script>
