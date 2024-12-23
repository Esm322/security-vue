<template>
  <ul class="security__list list-reset">
    <SecurityImmediateTask v-for="task in props.immediateTasks" :key="task.task_id" :date="task.task_date"
      :id="task.task_id" :title="task.task_title" />
  </ul>
</template>

<script setup lang="ts">
import SecurityImmediateTask from './SecurityImmediateTask.vue';

import type { IImmediateTask } from '@/interfaces/dataInterfaces';

const props = defineProps<{
  immediateTasks: IImmediateTask[]
}>();
</script>
