<template>
  <BaseHeader />

  <main class="main">
    <div class="container task__container">
      <BaseMapTask :coordinates="securityImmediateTaskArray" v-if="isTaskReceived" />

      <div class="wrapper-loading" v-else>
        <div class="spinner-16">
        </div>
      </div>

      <div class="task__wrapper">
        <div class=" task__wrapper-el immediate">
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
import { onMounted, onUnmounted, watch, ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useGuardUserStore } from '@/stores/useGuardUser';

import useTaskArray from '@/composables/useTaskArray';

import BaseHeader from '@/components/BaseHeader.vue';
import BaseMapTask from '@/components/BaseMapTask.vue';

const api = 'http://localhost:3000/api/immediate_task/';

const route = useRoute();
const router = useRouter();

const isTaskReceived = ref<boolean>(false);

const store = useGuardUserStore();
const { isLoading, securityImmediateTask } = storeToRefs(store);

const { securityImmediateTaskArray } = useTaskArray();

const getImmediateTask = () => store.getTask(route.params.id, api, securityImmediateTask);

const updateTask = setInterval(getImmediateTask, 4000);

const setIsTaskReceived = () => setTimeout(() => isTaskReceived.value = true, 2000);

watch(securityImmediateTask, () => {
  if (securityImmediateTask.value!.task_status === true) {
    router.replace({ name: 'Security' });
  }
})

onMounted(() => {
  getImmediateTask();
  setIsTaskReceived();
});

onUnmounted(() => {
  clearInterval(updateTask);
  isLoading.value = false;
  securityImmediateTask.value = null;
})
</script>
