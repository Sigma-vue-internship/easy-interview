<script setup lang="ts">
import { ref, computed } from "vue";
import BarChart from "../components/statistics/BarChart.vue";
import DoughnutChart from "../components/statistics/DoughnutChart.vue";
import _uniq from "lodash/uniq";
import { Question } from "../dto/questions";
import { useQuestionStore } from "../stores/questions";
import { useResultsStore } from "../stores/results";

interface categoryAmount {
  category: Object;
  count: number;
}
interface doughnutData {
  labels: Array<string>;
  datasets: Array<doughnutDataset>;
}
interface doughnutDataset {
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
  borderColor: string;
  hoverOffset: number;
}
interface chartData {
  labels: Array<string>;
  datasets: Array<Object>;
}

const { getAllQuestions } = useQuestionStore();
const { getPercentageResults } = useResultsStore();

const activeTab = ref("Results");
const categories = ref<string[]>([]);
const categoriesAmounts = ref<categoryAmount[]>([]);
const doughnutColors = ref<string[]>([]);
const chartData = ref<Object>({
  labels: [],
  // TODO:create multiple datasets, for different legend colors, and different candidates quizes
  datasets: [
    {
      label: "Top 10 candidates",
      data: [],
      backgroundColor: "rgba(102, 255, 0, 0.301)",
      borderColor: "rgba(102, 255, 0, 1)",
      borderWidth: 1,
      borderRadius: 5,
      hoverBorderWidth: 0,
      hoverBackgroundColor: "#fff",
    },
  ],
});
const currentChartHeight = ref({
  height: "450px",
  position: "relative",
});
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
const doughnutData = ref<doughnutData>({
  labels: [],
  datasets: [
    {
      label: "My First Dataset",
      data: [],
      backgroundColor: [],
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

async function getQuestions() {
  const data = await getAllQuestions();
  categories.value = _uniq(data.map((q: Question) => q.category));
  categoriesAmounts.value = categories.value.map((category: any) => {
    return {
      category,
      count: 0,
    };
  });
  data.forEach((q: Question) => {
    categoriesAmounts.value.forEach(amount => {
      if (amount.category === q.category) {
        amount.count++;
      }
    });
  });
  doughnutData.value.labels = [...categories.value];
  doughnutData.value.datasets[0].data = [
    ...categoriesAmounts.value.map(amount => amount.count),
  ];
  doughnutColors.value = generateColors(categories.value.length);
  doughnutData.value.datasets[0].backgroundColor = [...doughnutColors.value];
}
async function getAllResults() {
  const data = await getPercentageResults();
  const topCandidates = getTopCandidates(data);
  chartData.value.labels = [
    ...topCandidates.map(result => result.candidateUsername),
  ];
  chartData.value.datasets[0].data = [
    ...topCandidates.map(result => result.resultPoints),
  ];
}
function getTopCandidates(candidates) {
  return candidates.sort((a, b) => a.resultPoints - b.resultPoints).slice(-10);
}
function setActiveTab(title) {
  activeTab.value = title;
}
function generateColors(count) {
  const backgroundColors = [] as Array<string>;
  let randomColor = "";
  const crypto = window.crypto || window.msCrypto;
  const array = new Uint32Array(1);
  for (let i = 0; i < count; i++) {
    crypto.getRandomValues(array);
    randomColor = array[0].toString(16);
    backgroundColors.push(`#${randomColor}`);
  }
  return backgroundColors;
}
const isTabActive = title => (activeTab.value === title ? "active" : "");
function resizeChart(chart, sizes) {
  if (sizes.width <= 350) {
    currentChartHeight.value.height = "250px";
    return;
  }
  currentChartHeight.value.height = "450px";
}
const currentAlert = computed(() => {
  switch (activeTab.value) {
    case "Results":
      return "Top 10 candidate results statistics";
    default:
      return "The quantity of all questions";
  }
});
getAllQuestions();
getAllResults();
</script>
<template>
  <div class="p-4 rounded">
    <h1 class="text-primary fs-2 pb-1">Statistics</h1>
    <div
      class="alert alert-primary d-flex align-items-center mt-2"
      role="alert"
    >
      <div class="d-flex gap-2 align-items-center">
        <font-awesome-icon icon="fa-solid fa-circle-info" />{{ currentAlert }}
      </div>
    </div>
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
