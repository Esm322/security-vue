<template>
  <div class="map">
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
      <yandex-map-marker v-for="(marker, index) in props.coords" :key="index" :settings="marker"
        position="top-center left-center">
        <div class="marker"></div>
      </yandex-map-marker>
      <template>
        <yandex-map-marker v-for="(marker, index) in currPosition" :key="index" :settings="marker"
          position="top-center left-center">
          <div class="marker"></div>
        </yandex-map-marker>
      </template>
      <yandex-map-default-scheme-layer />
    </yandex-map>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue';
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapListener,
  YandexMapMarker,
  YandexMapControls,
  YandexMapZoomControl
} from 'vue-yandex-maps';
import type { YMap, LngLat } from '@yandex/ymaps3-types';

type TCoords = {
  coordinates: LngLat,
  screenCoordinates: number[],
}

type TPosition = {
  coordinates: LngLat,
}

const props = defineProps<{
  coords: TCoords[] | null,
}>();

const emits = defineEmits(['update:coordinates']);

const currCoords = ref<null | TCoords[]>(null);
const currPosition = ref<null | TPosition[]>(null)

const map = shallowRef<null | YMap>(null);

const getPosition = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    currPosition.value = [
      {
        coordinates: [
          longitude,
          latitude
        ]
      }
    ];
  })
};

const setCoordinates = (object: any, event: any) => emits('update:coordinates', currCoords.value = [event]);

onMounted(() => {
  getPosition();
})
</script>

<style scoped>
.marker {
  position: relative;
  width: 20px;
  height: 20px;
  background: #ff0000;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 20px;
}
</style>
