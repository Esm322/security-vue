<template>
  <button class="main__btn-sos btn-reset" @click="postImmediate">
    SOS
  </button>
</template>

<script setup lang="ts">
import { watch } from 'vue';

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUser';

const store = useUserStore();
const { continousCoordinates, user } = storeToRefs(store);

const currDate = new Date();

const options = {
  enableHighAccuracy: true,
};

const error = () => 'Error';

const getContinuousPosition = () => navigator.geolocation.watchPosition((position) => {
  const { latitude, longitude } = position.coords;

  console.log(`New position: ${longitude}, ${latitude}`);

  continousCoordinates.value = [
    longitude,
    latitude
  ]
}, error, options);

const postImmediate = () => {
  getContinuousPosition();

  store.postImmediateTask(user.value!.phone, user.value!.fullname, currDate, continousCoordinates.value!)
};

watch(continousCoordinates, (newValue) => {
  if (newValue) {
    store.patchImmediateTask(user.value!.fullname, newValue);
  }
})
</script>
