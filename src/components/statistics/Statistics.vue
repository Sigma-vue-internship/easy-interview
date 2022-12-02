<script setup>
import { ref } from "vue";
import BarChart from "./BarChart.vue";
import DoughnutChart from "./DoughnutChart.vue";
const activeTab = ref("Results");
const chartData = ref({
  labels: ["January", "February", "March", "January", "February", "March"],
  datasets: [
    {
      label: "Result points",
      data: [40, 20, 12, 40, 20, 12],
      backgroundColor: "#87CF23",
      hoverBackgroundColor: "#b5fd50",
    },
  ],
});
const currentChartHeight = ref({
  height: "450px",
  position: "relative",
});
function setActiveTab(title) {
  activeTab.value = title;
}
const isTabActive = title => (activeTab.value === title ? "active" : "");
function resizeChart(chart, sizes) {
  if (sizes.width <= 350) {
    currentChartHeight.value.height = "250px";
    console.log(123);
    return;
  }
  currentChartHeight.value.height = "450px";
}
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  onResize: resizeChart,
  scales: {
    xAxis: {
      grid: {
        color: "#474B4F",
      },
    },
    yAxis: {
      grid: {
        color: "#474B4F",
      },
    },
  },
});

const doughnutData = ref({
  labels: ["HTML", "CSS", "Vue.js"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#b5fd50", "#55f169", "#73ffd5"],
      borderColor: "#222629",
      hoverOffset: 4,
    },
  ],
});
const doughnutOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateRotate: false,
  },
});
</script>
<template>
  <div class="container p-4 rounded">
    <h1 class="text-primary fs-2 pb-3">Statistics</h1>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button
          class="nav-link"
          :class="isTabActive('Results')"
          aria-current="page"
          @click="setActiveTab('Results')"
        >
          Results
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="isTabActive('Questions')"
          aria-current="page"
          @click="setActiveTab('Questions')"
        >
          Questions
        </button>
      </li>
    </ul>
    <BarChart
      v-if="activeTab === 'Results'"
      class="border border-dark border-top-0"
      :css-classes="'p-2'"
      :chart-data="chartData"
      :styles="currentChartHeight"
      :chart-options="chartOptions"
    />
    <DoughnutChart
      v-if="activeTab === 'Questions'"
      class="border border-dark border-top-0"
      :css-classes="'p-3 pb-4'"
      :chart-data="doughnutData"
      :doughnut-options="doughnutOptions"
    />
  </div>
</template>
