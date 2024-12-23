<template>
  <li class="security__item">
    <router-link :to="{ name: 'ImmediateTask', params: { id } }" class="security__item-link">
      {{ props.id }}
      <span>
        {{ props.title }}
      </span>
      <span class="security__item-time">
        {{ props.date }}
      </span>
    </router-link>
  </li>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps<{
  id: number,
  date: string,
  title: string,
}>();
</script>
