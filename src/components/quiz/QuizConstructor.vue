<script setup lang="ts">
import _uniq from "lodash/uniq";
import { computed, onMounted, ref } from "vue";
import { QuizQuestion, QuizResult } from "../../../dto/quiz";
import { Question } from "../../../dto/questions";
import { PercentsResult } from "../../../dto/results";
import QuizList from "./QuizList.vue";
import CandidateInfo from "../quiz/CandidateInfo.vue";
import { useResultsStore } from "../../stores/results";
import { useQuestionStore } from "../../stores/questions";
import { useRouter } from "vue-router";
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
const router = useRouter();
const resultsStore = useResultsStore();
const questionStore = useQuestionStore();

const selectedCategory = ref();
const quizMode = ref(true);
// const checkedQuestions = ref([]);
const checkedQuestions = ref({});
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
const questionsByCategories = ref({});
const questionCategories = ref<Array<String>>([]);

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

function addQuestions(question: Question) {
  questionList.value = [
    ...questionList.value.filter(
      singleQuestion => singleQuestion.id !== question.id,
    ),
  ];
  if (!questionCategories.value.includes(question.category)) {
    questionCategories.value.push(question.category);
  }
  quizList.value.push(question);
  questionsByCategories.value = { ...spreadQuestionsByCategories() };
}
function addAllQuestions() {
  quizList.value = [...quizList.value, ...categoryQuestions.value];
  const collapsedQuestions = [
    ...questionList.value,
    ...categoryQuestions.value,
  ];
  const tempQuestion = {};
  collapsedQuestions.forEach(question =>
    tempQuestion[question.text]
      ? (tempQuestion[question.text] = null)
      : (tempQuestion[question.text] = question),
  );
  questionList.value = Object.values(tempQuestion).filter(question => question);
  questionsByCategories.value = { ...spreadQuestionsByCategories() };
  console.log(questionsByCategories.value);

  if (!questionCategories.value.includes(selectedCategory.value)) {
    questionCategories.value.push(selectedCategory.value);
  }
}
function answerPoints(point: number, id: string) {
  checkedAnswer.value = point;
  const filtredElement = quizList.value.find(
    quizAnswer => quizAnswer.id === id,
  );
  console.log(filtredElement);
  if (filtredElement) {
    filtredElement.answerPoints = checkedAnswer.value;
    if (startQuizDate.value === 0) {
      startQuizDate.value = Date.now();
    }
    return filtredElement;
  }
}

function deleteQuestion(index: number, item: object) {
  quizList.value.splice(index, 1);
  questionList.value.push(item);
  questionsByCategories.value = { ...spreadQuestionsByCategories() };
  if (!questionsByCategories.value[item.category]) {
    questionCategories.value = questionCategories.value.filter(
      questionCategory => questionCategory !== item.category,
    );
  }
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

const setModeQuiz = () => {
  quizMode.value = false;
  questionCategories.value = _uniq(quizList.value.map(obj => obj.category));
  // questionsByCategories.value = { ...spreadQuestionsByCategories() };
  // here ok
};
function spreadQuestionsByCategories() {
  const tempCategoryQuestions = {};

  quizList.value.forEach(q => {
    if (tempCategoryQuestions[q.category]) {
      tempCategoryQuestions[q.category].push(q);
      return;
    }

    tempCategoryQuestions[q.category] = [];
    tempCategoryQuestions[q.category].push(q);
  });
  return tempCategoryQuestions;
}
async function postResult() {
  result.value.questionAnswer = quizList.value;
  result.value.title = `Passed by ${currentCandidateName.value}`;
  result.value.startedAt = startQuizDate.value;
  result.value.endedAt = Date.now();
  try {
    const {
      data: { candidateId, id },
    } = await resultsStore.postResult(result.value, currentCandidateId.value);
    router.push({
      name: "singleResult",
      params: {
        candidateId,
        id,
      },
    });
  } catch (e) {
    console.log(e);
  }
  postPercentageResult();
  quizList.value = [];
}
</script>

<template>
  <div class="container mt-3 text-center text-secondary">
    <CandidateInfo
      v-if="quizMode"
      @choosed-candidate="setCandidate"
    />
    <h2
      v-if="quizMode"
      class="text-primary text-center text-md-start mt-5"
    >
      Choose Questions
    </h2>
    <select
      v-if="quizMode"
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
    <ul
      v-if="quizMode"
      class="list-unstyled"
    >
      <li
        v-for="item in categoryQuestions"
        :key="item.id"
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-start ps-sm-3"
      >
        <div>
          <label
            class="w-100 form-check-label ps-2"
            :for="item.id"
          >
            <div
              class="row justify-content-md-between justify-content-center text-center text-md-start align-items-center"
            >
              <div class="col-md-9 col-12">
                <div>{{ item.text }}</div>
                <div>{{ item.answer }}</div>
                <div>Question Score: {{ item.point }}</div>
              </div>
              <div class="col-md-2 col-12 text-md-end me-md-2 text-center">
                <font-awesome-icon
                  class="btn btn-outline-primary border-0"
                  style="height: 50px"
                  icon="fa-regular fa-square-plus"
                  @click="addQuestions(item)"
                />
              </div>
            </div>
          </label>
        </div>
      </li>
    </ul>
    <div
      v-if="quizMode"
      class="text-end pe-2"
    >
      <button
        class="btn btn-outline-primary border-0"
        @click="addAllQuestions"
      >
        <font-awesome-icon
          class="pe-2"
          style="height: 20px; width: 30px"
          icon="fa-solid fa-arrow-down-short-wide"
        />
        <span class="fs-5">Add all</span>
      </button>
    </div>
    <QuizList
      :question-arrays-by-category="questionsByCategories"
      :is-mode-review="quizMode"
      :categories="questionCategories"
      @add-point="answerPoints"
      @delete-question="deleteQuestion"
      @post-quiz="postResult"
      @set-mode="setModeQuiz"
    />
  </div>
</template>
