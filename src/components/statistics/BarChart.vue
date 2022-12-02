<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);
ChartJS.defaults.color = "#fff";

const props = defineProps({
  chartId: {
    type: String,
    default: "bar-chart",
  },
  datasetIdKey: {
    type: String,
    default: "label",
  },
  width: {
    type: Number,
    default: 400,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: Object,
    default: () => {},
  },
  plugins: {
    type: Array,
    default: () => [],
  },
  chartData: {
    type: Object,
    default: () => ({}),
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
    }),
  },
});
</script>
<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="'candidateResults'"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
  />
</template>
