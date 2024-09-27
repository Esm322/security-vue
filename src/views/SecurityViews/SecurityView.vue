<template>
  <main class="main">
    <div class="container security__container">
      <SecurityList :tasks="test" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useSecurityStore } from '@/stores/useSecurity';

import axios, { type AxiosResponse } from 'axios';

import SecurityList from '@/components/Security/SecurityList.vue';

const store = useSecurityStore();
const { securityTasksData } = storeToRefs(store);

const test = ref([]);

const getTasks = () => {
  return axios.get('/api/tasks')
    .then((response: AxiosResponse) => test.value = response.data);
}

onMounted(() => {
  // store.getTasksData();
  getTasks();
});
</script>
