<template>
  <div class="security__analitics-item">
    <Doughnut :data="props.data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  data: any
}>();

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
