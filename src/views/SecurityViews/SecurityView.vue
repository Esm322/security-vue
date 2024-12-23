<template>
  <BaseHeader />

  <main class="main">
    <div class="container security__container">
      <SecurityList :tasks="securityTasksData!" />

      <SecurityImmediateList :immediateTasks="securityImmediateTasksData!" />

      <div class="security__analitics">
        <BarChart :data="chartConfig" />

        <BarChart :data="chartConfig" />

        <BarChart :data="chartConfig" />

        <BarChart :data="chartConfig" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { storeToRefs } from 'pinia';
import { useGuardUserStore } from '@/stores/useGuardUser';

import useChart from '@/composables/useChart';

import SecurityList from '@/components/Security/SecurityList.vue';
import SecurityImmediateList from '@/components/Security/SecurityImmediateList.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import BarChart from '@/components/BarChart.vue';

const store = useGuardUserStore();
const { securityTasksData, securityImmediateTasksData } = storeToRefs(store);

const { chartConfig } = useChart();

onMounted(() => {
  store.getTasksData();
  store.getAllTasksData();
  store.getImmediateTasksData();
});
</script>
