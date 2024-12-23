<template>
  <ul class="security__list list-reset">
    <SecurityTask v-for="task in props.tasks" :key="task.task_id" :date="task.task_date" :id="task.task_id"
      :title="task.task_title" />
  </ul>
</template>

<script setup lang="ts">
import SecurityTask from './SecurityTask.vue';

import type { ITask } from '@/interfaces/dataInterfaces';

const props = defineProps<{
  tasks: ITask[]
}>();
</script>
