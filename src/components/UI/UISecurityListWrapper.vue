<template>
  <div class="security__list-wrapper">
    <SecurityList :tasks="securityTasksData!" />

    <SecurityImmediateList v-show="securityImmediateTasksData!.length" :immediateTasks="securityImmediateTasksData!" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGuardUserStore } from '@/stores/useGuardUser';

import SecurityList from '@/components/Security/SecurityList.vue';
import SecurityImmediateList from '@/components/Security/SecurityImmediateList.vue';

const store = useGuardUserStore();
const { securityTasksData, securityImmediateTasksData } = storeToRefs(store);
</script>
