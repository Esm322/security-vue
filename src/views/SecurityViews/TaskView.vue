<template>
  <BaseHeader />

  <main class="main">
    <div class="container task__container">
      <BaseMapTask :coordinates="securityTaskArray" v-if="securityTaskArray.length > 0" />

      <div class="task__wrapper">
        <div class="task__wrapper-el">
          <h2 class="task__title">
            {{ securityTask?.task_title }}
          </h2>

          <span class="task__date">
            {{ securityTask?.task_date }}
          </span>
        </div>

        <p class="task__description">
          {{ securityTask?.task_description }}
        </p>

        <button class="btn-reset task__btn" :disabled="isLoading" @click="closeTask(store.patchTask, securityTask!)">
          <span v-if="isLoading" class="spinner-16"></span>
          <span v-else>Закрыть задачу</span>
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { useRoute } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useGuardUserStore } from '@/stores/useGuardUser';

import axios, { type AxiosResponse } from 'axios';

import useCloseTask from '@/composables/useCloseTask';

import BaseHeader from '@/components/BaseHeader.vue';
import BaseMapTask from '@/components/BaseMapTask.vue';

const route = useRoute();

const store = useGuardUserStore();
const { isLoading, securityTaskArray, securityTask } = storeToRefs(store);

const { closeTask } = useCloseTask();

async function getTask() {
  try {
    const response: AxiosResponse = await axios.get(`http://localhost:3000/api/task/${route.params.id}`);

    return securityTask.value = response.data;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  getTask();
});

onUnmounted(() => {
  isLoading.value = false;
  securityTask.value = null;
})
</script>
