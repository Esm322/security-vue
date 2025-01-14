<template>
  <BaseHeader />

  <main class="main">
    <div class="container task__container">
      <BaseMapTask :coordinates="securityImmediateTaskArray" v-if="securityImmediateTaskArray.length > 0" />

      <div class="task__wrapper">
        <div class="task__wrapper-el immediate">
          <h2 class="task__title">
            {{ securityImmediateTask?.task_title }}
          </h2>

          <span class="task__date">
            {{ securityImmediateTask?.task_date }}
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useGuardUserStore } from '@/stores/useGuardUser';

import axios, { type AxiosResponse } from 'axios';

import BaseHeader from '@/components/BaseHeader.vue';
import BaseMapTask from '@/components/BaseMapTask.vue';

const route = useRoute();
const router = useRouter();

const store = useGuardUserStore();
const { isLoading, securityImmediateTask, securityImmediateTaskArray } = storeToRefs(store);

const updateTask = setInterval(getImmediateTask, 4000);

async function getImmediateTask() {
  try {
    const response: AxiosResponse = await axios.get(`http://localhost:3000/api/immediate_task/${route.params.id}`);

    return securityImmediateTask.value = response.data;
  } catch (err) {
    console.log(err);
  }
};

watch(securityImmediateTask, () => {
  if (securityImmediateTask.value!.task_status === true) {
    router.replace({ name: 'Security' });
  }
})

onMounted(() => {
  getImmediateTask();
});

onUnmounted(() => {
  clearInterval(updateTask);
  isLoading.value = false;
  securityImmediateTask.value = null;
})
</script>
