<script setup lang="ts">
import _uniq from "lodash/uniq";
import { computed, onMounted, ref } from "vue";
import { QuizQuestion, QuizResult } from "../dto/quiz";
import { Question } from "../dto/questions";
import QuizList from "../components/quiz/QuizList.vue";
import CandidateInfo from "../components/quiz/CandidateInfo.vue";
import { useResultsStore } from "../stores/results";
import { useQuestionStore } from "../stores/questions";
import { useRouter } from "vue-router";
import { Notify } from "notiflix";

interface CurrentCandidate {
  name: string;
  id: string;
}

const router = useRouter();
const resultsStore = useResultsStore();
const { getAllQuestions } = useQuestionStore();

const selectedCategory = ref<string>("");
const quizMode = ref<boolean>(true);
const questionList = ref<Array<QuizQuestion>>([]);
const checkedAnswer = ref<number>(0);
const currentCandidate = ref<CurrentCandidate>({
  name: "",
  id: "",
});
const startQuizDate = ref<number>(0);
const result = ref<QuizResult>({
  questionAnswer: [],
  title: "",
  startedAt: 0,
  endedAt: 0,
});
const isCandidateChoosed = ref<boolean>(false);
const questionsByCategories = ref<Object>({});
const questionCategories = ref<Array<String>>([]);

onMounted(() => {
  selectedCategory.value = "Select category for displaying questions";
});

const categories = computed(() => {
  return _uniq(questionList.value.map(item => item.category));
});
const categoryQuestions = computed(() =>
  questionList.value.filter(
    question => question.category === selectedCategory.value,
  ),
);
const quizList = ref<QuizQuestion[]>([]);
const resultPercents = computed(
  () =>
    (quizList.value.reduce((summ, answer) => summ + answer?.answerPoints, 0) *
      100) /
    quizList.value.reduce((summ, answer) => summ + answer.point, 0),
);
async function getQuestionList() {
  try {
    questionList.value = await getAllQuestions();
  } catch (e) {
    console.log(e);
  }
}

function addQuestions(question: QuizQuestion) {
  questionList.value = [
    ...questionList.value.filter(
      singleQuestion => singleQuestion.id !== question.id,
    ),
  ];
  if (!questionCategories.value.includes(question.category)) {
    questionCategories.value.push(question.category);
  }
  if (
    !questionList.value.find(
      questionItem => questionItem.category === question.category,
    )
  ) {
    selectedCategory.value = "Select category for displaying questions";
  }
  quizList.value.push(question);
  questionsByCategories.value = { ...spreadQuestionsByCategories() };
}
function removeQuestionsFromCategory() {
  const collapsedQuestions = [
    ...questionList.value,
    ...categoryQuestions.value,
  ];
  const tempQuestion = {};
  collapsedQuestions.forEach(question => {
    tempQuestion[question.id]
      ? (tempQuestion[question.id] = null)
      : (tempQuestion[question.id] = question);
  });
  return tempQuestion;
}
function addAllQuestions() {
  quizList.value = [...quizList.value, ...categoryQuestions.value];
  const tempQuestion: Object = removeQuestionsFromCategory();

  questionList.value = Object.values(tempQuestion).filter(question => question);

  questionsByCategories.value = { ...spreadQuestionsByCategories() };

  if (!questionCategories.value.includes(selectedCategory.value)) {
    questionCategories.value.push(selectedCategory.value);
  }

  selectedCategory.value = "Select category for displaying questions";
}
function answerPoints(point: number, id: string) {
  checkedAnswer.value = point;
  const filtredElement = quizList.value.find(
    quizAnswer => quizAnswer.id === id,
  );
  if (filtredElement) {
    filtredElement.answerPoints = checkedAnswer.value;
    return filtredElement;
  }
}

function deleteQuestion(questionId: string, item: QuizQuestion) {
  quizList.value = quizList.value.filter(
    question => question.id !== questionId,
  );
  questionList.value.push(item);
  questionsByCategories.value = { ...spreadQuestionsByCategories() };
  if (!questionsByCategories.value[item.category]) {
    questionCategories.value = questionCategories.value.filter(
      questionCategory => questionCategory !== item.category,
    );
  }
}
const isQuizAvailable = ref(false);
async function setCandidate(id: string, name: string) {
  currentCandidate.value.id = id;
  currentCandidate.value.name = name;
  try {
    const data = await resultsStore.getResultsForCandidate(id);
    if (data.length >= 3) {
      return Notify.failure("This candidate has already passed 3 quizes", {
        distance: "65px",
      });
    }
    isQuizAvailable.value = true;
  } catch (e) {
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
  // here we need to check if candidate, has 3 results already
}
const setCandidateSelected = async () => {
  isCandidateChoosed.value = true;
  await getQuestionList();
};
// TODO: add test for post persentageResult
async function postPercentageResult() {
  try {
    await resultsStore.postPercentageResult({
      candidateUsername: currentCandidate.value.name,
      resultPoints: resultPercents.value,
      candidateId: currentCandidate.value.id,
      id: "",
    });
  } catch (e) {
    console.log(e);
  }
}

const setModeQuiz = () => {
  quizMode.value = false;
  questionCategories.value = _uniq(quizList.value.map(obj => obj.category));
  startQuizDate.value = Date.now();
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
  if (
    quizList.value.filter(
      question => !question.answerPoints && question.answerPoints !== 0,
    ).length
  ) {
    Notify.warning("Please, complete quiz", {
      distance: "65px",
    });
    return;
  }
  result.value.questionAnswer = quizList.value;
  result.value.title = `${Math.round(resultPercents.value)}%`;
  result.value.startedAt = startQuizDate.value;
  result.value.endedAt = Date.now();
  try {
    const { candidateId, id } = await resultsStore.postResult(
      result.value,
      currentCandidate.value.id,
    );
    postPercentageResult();
    quizList.value = [];
    router.push({
      name: "singleResult",
      params: {
        candidateId,
        resultId: id,
      },
    });
  } catch (e) {
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}
</script>

<template>
  <CandidateInfo
    v-if="quizMode && !isCandidateChoosed"
    :is-quiz-available="isQuizAvailable"
    @set-candidate-selected="setCandidateSelected"
    @choosed-candidate="setCandidate"
  />
  <h2
    v-if="quizMode && isCandidateChoosed"
    class="text-primary text-center text-md-start m-0"
  >
    Choose Questions
  </h2>
  <div
    v-if="quizMode && isCandidateChoosed"
    class="alert p-0 d-flex align-items-center justify-content-center justify-content-md-start"
    role="alert"
  >
    <font-awesome-icon icon="fa-solid fa-circle-info" />
    <p class="ps-2 m-0">
      Please, choose question that are going to be inside your quiz
    </p>
  </div>
  <select
    v-if="quizMode && isCandidateChoosed"
    v-model="selectedCategory"
    class="form-select form-select-sm mb-3"
    aria-label=".form-select-sm"
  >
    <option selected>Select category for displaying questions</option>
    <option
      v-for="category in categories"
      id="categoryOption"
      :key="category"
      :value="category"
    >
      {{ category }}
    </option>
  </select>
  <ul
    v-if="quizMode && isCandidateChoosed"
    class="list-unstyled"
  >
    <li
      v-for="item in categoryQuestions"
      :key="item.id"
      class="border border-light mt-4 py-4 px-2 rounded-3 mx-auto shadow text-start ps-sm-3"
    >
      <div
        class="row justify-content-md-between justify-content-center align-items-center"
      >
        <div class="col-md-9 col-9">
          <label
            class="w-100 form-check-label ps-2"
            :for="item.id"
          >
            <p>
              <span class="text-primary fs-5"
                ><FontAwesomeIcon
                  class="pe-1"
                  icon="fa-circle-question"
                />Question:</span
              >
              {{ item.text }}
            </p>

            <p class="text-secondary mb-1 text-md-start pb-2 pb-md-0">
              <span class="text-primary"
                ><FontAwesomeIcon
                  class="pe-1"
                  icon="fa-circle-check"
                />Answer: </span
              >{{ item.answer }}
            </p>
            <p>Max points: {{ item.point }}</p>
          </label>
        </div>
        <div class="col-md-2 col-3 text-end me-md-2">
          <font-awesome-icon
            id="addQuestionBtn"
            class="btn btn-outline-primary border-0"
            style="height: 50px"
            icon="fa-regular fa-square-plus"
            @click="addQuestions(item)"
          />
        </div>
      </div>
    </li>
  </ul>
  <div
    v-if="quizMode && isCandidateChoosed"
    class="text-end pe-2"
  >
    <button
      v-if="selectedCategory !== 'Select category for displaying questions'"
      id="addAllQuestionsBtn"
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
    v-if="isCandidateChoosed"
    :question-arrays-by-category="questionsByCategories"
    :is-mode-review="quizMode"
    :categories="questionCategories"
    :questions="quizList"
    @add-point="answerPoints"
    @delete-question="deleteQuestion"
    @post-quiz="postResult"
    @set-mode="setModeQuiz"
  />
</template>
