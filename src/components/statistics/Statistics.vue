<script setup lang="ts">
import { ref } from "vue";
import BarChart from "./BarChart.vue";
import DoughnutChart from "./DoughnutChart.vue";
import _uniq from "lodash/uniq";
import { Question } from "../../../dto/questions";
import { useQuestionStore } from "../../stores/questions";

interface categoryAmount {
  category: Object;
  count: number;
}
interface doughnutData {
  labels: Array<String>;
  datasets: Array<doughnutDataset>;
}
interface doughnutDataset {
  label: String;
  data: Array<Number>;
  backgroundColor: Array<String>;
  borderColor: String;
  hoverOffset: Number;
}

const { getQuestions } = useQuestionStore();

const activeTab = ref("Results");
const categories = ref<String[]>([]);
const categoriesAmounts = ref<categoryAmount[]>([]);
const doughnutColors = ref<String[]>([]);
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

async function getAllQuestions() {
  const { data } = await getQuestions();
  categories.value = _uniq(data.map((q: Question) => q.category));
  categoriesAmounts.value = categories.value.map((category: any) => {
    return {
      category,
      count: 0,
    };
  });
  console.log(categoriesAmounts.value);
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
getAllQuestions();
const chartData = ref<Object>({
  labels: [],
  datasets: [
    {
      label: "Result points",
      data: [],
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
function generateColors(count) {
  const backgroundColors = [] as Array<String>;
  let randomColor = "";
  for (let i = 0; i < count; i++) {
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
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
