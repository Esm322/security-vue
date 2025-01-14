<template>
  <BaseMap>
    <yandex-map v-model="map" :settings="{
      location: {
        center: props.coordinates[0].coordinates,
        zoom: 18,
      },
    }" width="100%" height="500px">
      <yandex-map-default-features-layer />
      <yandex-map-controls :settings="{ position: 'right' }">
        <yandex-map-zoom-control />
      </yandex-map-controls>
      <yandex-map-marker v-for="(marker, index) in props.coordinates" :key="index" :settings="marker"
        position="top-center left-center">
        <div class="marker"></div>
      </yandex-map-marker>
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
  YandexMapMarker,
  YandexMapControls,
  YandexMapZoomControl
} from 'vue-yandex-maps';

import BaseMap from './BaseMap.vue';

import type { YMap } from '@yandex/ymaps3-types';
import type { ITask, IImmediateTask } from '@/interfaces/dataInterfaces';

const props = defineProps<{
  coordinates: ITask[] | IImmediateTask[],
}>();

const map = shallowRef<null | YMap>();
</script>
