<template>
  <div class="security__analitics">
    <BarChart :data="chartConfig" />

    <BarChart :data="chartConfig" />

    <BarChart :data="chartConfig" />

    <BarChart :data="chartConfig" />
  </div>
</template>

<script setup lang="ts">
import useChart from '@/composables/useChart';

import BarChart from '@/components/BarChart.vue';

const { chartConfig } = useChart();
</script>
