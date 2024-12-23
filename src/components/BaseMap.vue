<template>
  <div class="map" :class="[{ 'form--active': props.coordinates }, { 'task--active': $route.name === 'Task' }]">
    <slot>

    </slot>
  </div>
</template>

<script setup lang="ts">
import type { ICoordinates } from '@/interfaces/dataInterfaces';

const props = defineProps<{
  coordinates?: ICoordinates,
}>();
</script>
