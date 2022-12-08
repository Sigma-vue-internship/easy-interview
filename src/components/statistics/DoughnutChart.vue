<script setup>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
);
ChartJS.defaults.plugins.legend.position = "top";
const props = defineProps({
  chartData: {
    type: Object,
    default: () => ({}),
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: false,
      },
    }),
  },
});
</script>
<template>
  <Doughnut
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
</template>
