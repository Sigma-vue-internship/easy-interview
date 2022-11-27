<script setup lang="ts">
import EditButton from "../common/EditButton.vue";
import _uniq from "lodash/uniq";
import { computed, onMounted, ref } from "vue";
import { QuizQuestion } from "../../../dto/quiz";
import QuizList from "./QuizList.vue";

defineProps({
  question: {
    type: Object as () => QuizQuestion,
    default: () => ({}),
  },
});

const selectedCategory = ref();
const checkedQuestion = ref([]);
const checkedAnswer = ref(0);

onMounted(() => {
  selectedCategory.value = "Select category for displaying questions";
});

const categories = computed(() =>
  _uniq(questionList.map(item => item.category)),
);

const categoryQuestions = computed(() =>
  questionList.filter(question => question.category === selectedCategory.value),
);

const quizList = ref<QuizQuestion[]>([]);

const questionList = [
  {
    point: 1,
    text: "text 1",
    answer: "answer 1",
    category: "HTML",
    id: "1",
  },
  {
    point: 5,
    text: "text 2",
    answer: "answer 2",
    category: "HTML",
    id: "2",
  },
  {
    point: 5,
    text: "text 3",
    answer: "answer 3",
    category: "CSS",
    id: "3",
  },
  {
    point: 5,
    text: "text 4",
    answer: "answer 4",
    category: "CSS",
    id: "4",
  },
  {
    point: 1,
    text: "text 6",
    answer: "answer 6",
    category: "Vue",
    id: "6",
  },
  {
    point: 1,
    text: "text 7",
    answer: "answer 7",
    category: "JavaScript",
    id: "7",
  },
];

function addQuestions() {
  const checkedArray = checkedQuestion.value;
  quizList.value = _uniq([...quizList.value, ...checkedArray]);
  checkedQuestion.value = [];
}

function answerPoints(point: number, id: string) {
  checkedAnswer.value = point;
  const filtredElement = quizList.value.find(answer => answer.id === id);
  if (filtredElement) {
    filtredElement.answerPoints = checkedAnswer.value;
    return filtredElement;
  }
  return;
}

function deleteQuestion(index) {
  quizList.value.splice(index, 1);
  return quizList;
}
</script>

<template>
  <div class="container mt-3 text-center text-secondary">
    <h2 class="text-primary text-center text-md-start">Constructor</h2>
    <select
      v-model="selectedCategory"
      class="form-select form-select-sm mb-3"
      aria-label=".form-select-sm"
    >
      <option selected>Select category for displaying questions</option>
      <option
        v-for="category in categories"
        :key="category"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
    <ul class="list-unstyled">
      <li
        v-for="item in categoryQuestions"
        :key="item.id"
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-start ps-sm-3"
      >
        <div class="form-check">
          <input
            :id="item.id"
            v-model="checkedQuestion"
            class="form-check-input"
            type="checkbox"
            :value="item"
          />
          <label
            class="form-check-label ps-2"
            :for="item.id"
          >
            <div class="col">{{ item.text }}</div>
            <div class="col">{{ item.answer }}</div>
            <div class="col">Question Score: {{ item.point }}</div>
          </label>
        </div>
      </li>
    </ul>

    <div class="text-center text-md-end pe-md-4 mt-md-4 mb-md-5 ps-5 ps-md-2">
      <EditButton @click="addQuestions" />
    </div>
    <QuizList
      :question-array="quizList"
      @add-point="answerPoints"
      @delete-question="deleteQuestion"
    />
  </div>
</template>
