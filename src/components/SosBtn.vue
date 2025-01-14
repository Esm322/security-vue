<template>
  <div class="main__sos-wrapper">
    <Transition name="sos" mode="out-in">
      <div class="main__sos-wrapper-btn" v-if="continousCoordinates">
        <span class="main__sos-info" :class="{ 'blink-text': continousCoordinates }">
          Отслеживаем ваше местоположение
        </span>
        <button class="main__btn-sos btn-reset" @click="closeImmediateTask">
          Прекратить отслеживание
        </button>
      </div>
      <button class="main__btn-sos btn-reset" @click="postImmediate" v-else>
        SOS
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue';

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUser';

const store = useUserStore();
const { continousCoordinates, user } = storeToRefs(store);

const currDate = new Date();

const options = {
  enableHighAccuracy: false,
};

const error = () => 'Error';

let id: number;

const getContinuousPosition = () => {
  id = navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;

    continousCoordinates.value = [
      longitude,
      latitude
    ]
  }, error, options);
};

const postImmediate = () => {
  getContinuousPosition();

  store.postImmediateTask(user.value!.phone, user.value!.fullname, currDate, continousCoordinates.value!)
};

const closeImmediateTask = () => {
  store.closeImmediateTask(user.value!.fullname, user.value!.phone);

  navigator.geolocation.clearWatch(id);
  continousCoordinates.value = null;
}

watch(continousCoordinates, (newValue) => {
  if (newValue) {
    store.patchImmediateTask(user.value!.fullname, newValue);
  }
})

window.addEventListener('beforeunload', (event) => {
  event.preventDefault();

  closeImmediateTask();
});

onUnmounted(() => {
  if (id) {
    closeImmediateTask();
  }
})
</script>
