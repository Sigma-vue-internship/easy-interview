<script setup lang="ts">
import DeleteButton from "../common/DeleteButton.vue";
import EditButton from "../common/EditButton.vue";
import _uniq from "lodash/uniq";
import { computed, onMounted, ref } from "vue";
import { QuizQuestion } from "../../../dto/quiz";

defineProps({
  question: {
    type: Object as () => QuizQuestion,
  },
});

const selectedCategory = ref();
const checkedQuestion = ref([]);
onMounted(() => {
  selectedCategory.value = "Select category for displaying questions";
});

const categories = computed(() =>
  _uniq(questionList.map((item) => item.category))
);

const categoryQuestions = computed(() =>
  questionList.filter(
    (question) => question.category === selectedCategory.value
  )
);

const quizList = ref<QuizQuestion[]>([]);

const questionList = [
  {
    point: 99,
    text: "text 1",
    answer: "answer 1",
    category: "HTML",
    id: "1",
  },
  {
    point: 15,
    text: "text 2",
    answer: "answer 2",
    category: "HTML",
    id: "2",
  },
  {
    point: 70,
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
    point: 77,
    text: "text 6",
    answer: "answer 6",
    category: "Vue",
    id: "6",
  },
  {
    point: 32,
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
}

function deleteQuestion(index: number) {
  quizList.value.splice(index, 1);
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
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-sm-start ps-sm-3"
        v-for="item in categoryQuestions"
        :key="item.id"
      >
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :value="item"
            :id="item.id"
            v-model="checkedQuestion"
          />
          <label class="form-check-label ps-2" :for="item.id">
            <div class="col">{{ item.text }}</div>
            <div class="col">{{ item.answer }}</div>
            <div class="col">Question Score: {{ item.point }}</div>
          </label>
        </div>
      </li>
    </ul>

    <div class="text-center text-md-end pe-md-4 mt-md-4 mb-md-5 ps-5 ps-md-2">
      <EditButton @click="addQuestions"> Add </EditButton>
    </div>

    <h4 class="text-primary text-center text-md-start mt-5">Question List</h4>
    <div v-if="quizList.length">
      <ul class="list-unstyled">
        <li
          class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-center text-md-start ps-sm-3"
          v-for="(question, index) in quizList"
          :key="index"
        >
          <div class="row">
            <div class="col-12 col-md-9 col-lg-10">
              <div class="row ps-2">
                <span class="text-center text-md-start">
                  {{ question.text }}
                </span>
              </div>
              <div class="row ps-2">
                <span class="text-center text-md-start">
                  Category: {{ question.category }}
                </span>
              </div>
              <div class="row ps-2">
                <span class="text-center text-md-start">
                  Question Score: {{ question.point }}
                </span>
              </div>
            </div>
            <div class="col-12 col-md-3 col-lg-2 text-center mt-3 ps-4 ps-md-1">
              <DeleteButton @click="deleteQuestion(index)" />
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center text-md-end mt-md-4 ps-5 ps-md-2">
        <EditButton @click="postQuiz">Save Quiz</EditButton>
      </div>
    </div>
    <div v-else>
      <p>Choosed questions will display here</p>
    </div>
  </div>
</template>
