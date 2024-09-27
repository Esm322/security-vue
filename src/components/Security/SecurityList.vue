<template>
  <ul class="security__list list-reset">
    <SecurityTask v-for="task in props.tasks" :key="task.id" />
  </ul>
</template>

<script setup lang="ts">
import SecurityTask from './SecurityTask.vue';

import type { ITask } from '@/interfaces/dataInterfaces';

const props = defineProps<{
  tasks: ITask[]
}>();
</script>
