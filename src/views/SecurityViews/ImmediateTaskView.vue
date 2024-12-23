<template>
  <BaseHeader />

  <main class="main">
    <div class="container task__container">
      <BaseMapTask :coordinates="taskArr" />

      <div class="task__wrapper">
        <div class="task__wrapper-el">
          <h2 class="task__title">
            {{ task?.task_title }}
          </h2>

          <span class="task__date">
            {{ task?.task_date }}
          </span>
        </div>

        <button class="btn-reset task__btn" @click="closeTask()">
          Закрыть задачу
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { useGuardUserStore } from '@/stores/useGuardUser';

import axios, { type AxiosResponse } from 'axios';

import type { IImmediateTask } from '@/interfaces/dataInterfaces';

import BaseHeader from '@/components/BaseHeader.vue';
import BaseMapTask from '@/components/BaseMapTask.vue';

const route = useRoute();
const router = useRouter();

const store = useGuardUserStore();

const task = ref<IImmediateTask | null>(null);

const taskArr = computed<IImmediateTask[]>((): IImmediateTask[] => {
  return task.value ? new Array(task.value) : [];
})

const closeTask = () => {
  store.patchImmediateTask(task.value!.task_id);

  setTimeout(() => {
    router.replace({ name: 'Security' })
  }, 2000)
};

const getTask = async () => {
  try {
    const response: AxiosResponse = await axios.get(`http://localhost:3000/api/immediate_task/${route.params.id}`);

    return task.value = response.data;
  } catch (err) {
    console.log(err);
  }
};

const updateTask = setInterval(getTask, 2000);

onMounted(() => {
  getTask();
});

onUnmounted(() => {
  clearInterval(updateTask);
})
</script>
