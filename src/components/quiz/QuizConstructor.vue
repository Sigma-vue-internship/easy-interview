<script setup lang="ts">
import SubmitButton from "../common/SubmitButton.vue";
import _uniq from "lodash/uniq";
import { computed, onMounted, ref } from "vue";
import { QuizQuestion, QuizResult } from "../../../dto/quiz";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import QuizList from "./QuizList.vue";
import CandidateInfo from "../quiz/CandidateInfo.vue";
import { useResultsStore } from "../../stores/results";
import { useQuestionStore } from "../../stores/questions";

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
      title: "",
      startedAt: 0,
      endedAt: 0,
    }),
  },
});

const resultsStore = useResultsStore();
const questionStore = useQuestionStore();

const selectedCategory = ref();
const checkedQuestions = ref([]);
const questionList = ref<QuizQuestion[]>([]);
const checkedAnswer = ref(0);
const currentCandidateId = ref(0);
const currentCandidateName = ref("");
const startQuizDate = ref(0);
const result = ref<QuizResult>({
  questionAnswer: [],
  title: "",
  startedAt: 0,
  endedAt: 0,
});

onMounted(() => {
  selectedCategory.value = "Select category for displaying questions";
});

const categories = computed(() =>
  _uniq(questionList.value.map(item => item.category)),
);

const categoryQuestions = computed(() =>
  questionList.value.filter(
    question => question.category === selectedCategory.value,
  ),
);

const resultPercents = computed(
  () =>
    (quizList.value.reduce((summ, answer) => summ + answer.answerPoints, 0) *
      100) /
    quizList.value.reduce((summ, answer) => summ + answer.point, 0),
);

async function getQuestionList() {
  try {
    const { data } = await questionStore.getAllQuestions();
    questionList.value = [...data];
  } catch (e) {
    console.log(e);
  }
}
getQuestionList();

const quizList = ref<QuizQuestion[]>([]);

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

function setCandidate(id: number, name: string) {
  currentCandidateId.value = id;
  currentCandidateName.value = name;
}

async function postPercentageResult() {
  try {
    await resultsStore.postPercentageResult({
      candidateUsername: currentCandidateName.value,
      resultPoints: resultPercents.value,
    });
  } catch (e) {
    console.log(e);
  }
}

async function postResult() {
  result.value.questionAnswer = quizList.value;
  result.value.title = `Passed by ${currentCandidateName.value}`;
  result.value.startedAt = startQuizDate.value;
  result.value.endedAt = Date.now();

  try {
    await resultsStore.postResult(result.value, currentCandidateId.value);
    selectedCategory.value = "Select category for displaying questions";
    quizList.value = [];
    Notify.success("Successful sent", {
      position: "center-top",
    });
  } catch (e) {
    console.log(e);
    Notify.failure("Something went wrong. Please, try again.", {
      position: "center-top",
    });
  }
  postPercentageResult();
}
</script>

<template>
  <div class="container mt-3 text-center text-secondary">
    <CandidateInfo @choosed-candidate="setCandidate" />
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
      <SubmitButton
        v-show="checkedQuestions.length"
        @click="addQuestions"
        >Add Questions</SubmitButton
      >
    </div>
    <QuizList
      :question-array="quizList"
      @add-point="answerPoints"
      @delete-question="deleteQuestion"
      @post-quiz="postResult"
    />
  </div>
</template>
