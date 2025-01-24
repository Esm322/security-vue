<template>
  <div class="map" :class="[{ 'form--active': props.coordinates }, { 'task--active': $route.name === 'Task' }]">
    <slot>

    </slot>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '@/interfaces/dataInterfaces';

const props = defineProps<{
  coordinates?: ITask[] | null,
}>();
</script>
