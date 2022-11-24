<script setup lang="ts">
import DeleteButton from "../common/DeleteButton.vue";
import EditButton from "../common/EditButton.vue";
import _uniq from "lodash/uniq";
import { computed, onMounted, ref } from "vue";
import { QuizQuestion } from "../../../dto/quiz";

defineProps({
  question: {
    type: Object as () => QuizQuestion,
    default: () => ({}),
  },
});

const selectedCategory = ref();
const checkedQuestion = ref([]);
const checkedAnswer = ref([]);

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

function postQuiz() {
  console.log(quizList.value);
  quizList.value = [];
  console.log(checkedAnswer.value);
}

function deleteQuestion(index: number) {
  quizList.value.splice(index, 1);
}

function pointsArray(point: number) {
  let start: number = 0;
  const numbersArray: number[] = [];
  while (start <= point) {
    numbersArray.push(start++);
  }
  return numbersArray;
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

    <h2 class="text-primary text-start mt-5">Question List</h2>
    <div v-if="quizList.length">
      <ul class="list-unstyled">
        <li
          v-for="(question, index) in quizList"
          :key="index"
          class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-center text-md-start ps-sm-3"
        >
          <div class="row py-3 px-2">
            <div class="col-8">
              <h5 class="text-start">
                {{ question.text }}
              </h5>
              <p class="text-secondary mb-1">{{ question.answer }}</p>
              <p class="text-secondary mb-1">
                Category: {{ question.category }}
              </p>
            </div>
            <div class="col-4 text-start">
              <h5 class="d-inline pe-3 text-primary">Answer:</h5>
              <div
                v-for="number in pointsArray(question.point)"
                :key="number"
                class="form-check form-check-inline"
              >
                <input
                  :id="'answer' + number"
                  v-model="checkedAnswer"
                  class="form-check-input"
                  type="checkbox"
                  :value="number"
                />
                <label
                  class="form-check-label"
                  for="answerCheckbox"
                  :value="number"
                  >{{ number }}</label
                >
              </div>
              <div class="mt-4 me-2 text-end">
                <DeleteButton @click="deleteQuestion(index)" />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center text-md-end mt-md-4 ps-5 ps-md-2 pe-4">
        <EditButton @click="postQuiz" />
      </div>
    </div>
    <div v-else>
      <p>Choosed questions will display here</p>
    </div>
  </div>
</template>
