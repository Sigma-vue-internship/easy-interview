<script setup lang="ts">
import SubmitButton from "../common/SubmitButton.vue";
import _uniq from "lodash/uniq";
import { computed, onMounted, ref } from "vue";
import { QuizQuestion, QuizResult } from "../../../dto/quiz";
import QuizList from "./QuizList.vue";
import CandidateInfo from "../quiz/CandidateInfo.vue";

defineProps({
  question: {
    type: Object as () => QuizQuestion,
    default: () => ({
      text: "",
      point: "",
      answerPoints: "",
      answer: "",
      category: "",
      id: "",
    }),
  },
  quizResult: {
    type: Object as () => QuizResult,
    default: () => ({
      questionAnswer: [],
      id: "",
      startedAt: 0,
      endedAt: 0,
    }),
  },
});

const selectedCategory = ref();
const checkedQuestions = ref([]);
const checkedAnswer = ref(0);
const currentCandidateId = ref(0);
const startQuizDate = ref(0);

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
  quizList.value = _uniq([...quizList.value, ...checkedQuestions.value]);
  checkedQuestions.value = [];
}

function answerPoints(point: number, id: string) {
  checkedAnswer.value = point;
  const filtredElement = quizList.value.find(
    quizAnswer => quizAnswer.id === id,
  );
  if (filtredElement) {
    filtredElement.answerPoints = checkedAnswer.value;
    if (startQuizDate.value === 0) {
      startQuizDate.value = Date.now();
    }
    return filtredElement;
  }
}

function deleteQuestion(index: number) {
  quizList.value.splice(index, 1);
}

function getCandidateById(id: number) {
  currentCandidateId.value = id;
}

function postResult() {
  const oneResult = ref<QuizResult>({
    questionAnswer: [],
    id: 0,
    startedAt: 0,
    endedAt: 0,
  });
  oneResult.value.questionAnswer = quizList.value;
  oneResult.value.id = currentCandidateId.value;
  oneResult.value.startedAt = startQuizDate.value;
  oneResult.value.endedAt = Date.now();
  console.log("result", oneResult.value);
}
</script>

<template>
  <div class="container mt-3 text-center text-secondary">
    <CandidateInfo @choosed-candidate-id="getCandidateById" />
    <h2 class="text-primary text-center text-md-start mt-5">
      Choose Questions
    </h2>
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
            v-model="checkedQuestions"
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
      <SubmitButton @click="addQuestions">Add Questions</SubmitButton>
    </div>
    <QuizList
      :question-array="quizList"
      @add-point="answerPoints"
      @delete-question="deleteQuestion"
      @post-quiz="postResult"
    />
  </div>
</template>
