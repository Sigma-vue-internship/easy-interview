<script setup lang="ts">
import { QuizQuestion } from "../../dto/quiz";
import _uniq from "lodash/uniq";
import SubmitButton from "../common/SubmitButton.vue";
import { Question } from "../../dto/questions";
import { ref, computed } from "vue";

interface Emit {
  (e: "addPoint", point: number, id: string): void;
  (e: "deleteQuestion", index: string, item: QuizQuestion): void;
  (e: "postQuiz");
  (e: "setMode"): void;
}
interface CorrectQuestion {
  isCorrect: boolean;
  questionId: string;
}

const props = defineProps({
  isModeReview: {
    type: Boolean,
    default: true,
  },
  questionArraysByCategory: {
    type: Object,
    default: () => {},
  },
  categories: {
    type: Array<String>,
    default: () => [],
  },
  questions: {
    type: Array<Question>,
    default: () => [],
  },
});

const emit = defineEmits<Emit>();

function startQuiz() {
  emit("setMode");
}

function postQuiz() {
  emit("postQuiz");
}

function deleteQuestion(index: string, item: QuizQuestion) {
  emit("deleteQuestion", index, item);
}
const checkedQuestions = ref<Array<string>>([]);
const correctQuestions = ref<Array<CorrectQuestion>>([]);
function addPoint(point: number, id: string) {
  addCorrectQuestion(point, id);
  if (!checkedQuestions.value.find(questionId => questionId === id)) {
    checkedQuestions.value.push(id);
  }
  emit("addPoint", point, id);
}
// TODO: This function should be reorganized.
function addCorrectQuestion(point: number, id: string) {
  const isQuestionChecked: boolean = correctQuestions.value.some(
    question => question.questionId === id,
  );
  const questionIndex: number = correctQuestions.value.findIndex(
    question => question.questionId === id,
  );
  if (point === 0 && !isQuestionChecked) {
    correctQuestions.value.push({ isCorrect: false, questionId: id });
  } else if (point !== 0 && !isQuestionChecked) {
    correctQuestions.value.push({ isCorrect: true, questionId: id });
  } else if (point === 0 && isQuestionChecked) {
    correctQuestions.value[questionIndex].isCorrect = false;
  } else if (point !== 0 && isQuestionChecked) {
    correctQuestions.value[questionIndex].isCorrect = true;
  }
}
function pointsArray(point: number) {
  return Array.apply(null, Array(point + 1)).map((_, i: number) => i);
}
const quizProgress = computed(() => {
  if (checkedQuestions.value.length) {
    return `${Math.floor(
      (checkedQuestions.value.length * 100) / props.questions.length,
    )}%`;
  }
  return "0%";
});
const correctCount = computed(() => {
  return correctQuestions.value.filter(question => question.isCorrect).length;
});
const incorrectCount = computed(() => {
  return correctQuestions.value.filter(question => !question.isCorrect).length;
});
</script>

<template>
  <h2
    v-if="categories.length"
    class="text-primary text-md-start mb-4"
  >
    Question List
  </h2>
  <div
    v-if="!isModeReview"
    class="mb-4 w-100"
  >
    <div class="d-flex pb-1">
      <h3 class="fs-4 pe-4">
        Progress: <span class="text-primary">{{ quizProgress }}</span>
      </h3>
      <h3 class="fs-4 pe-4">
        Correct:
        <span class="text-primary"
          >{{ correctCount }}/{{ questions.length }}</span
        >
      </h3>
      <h3 class="fs-4 pe-4">
        Incorrect:
        <span class="text-danger"
          >{{ incorrectCount }}/{{ questions.length }}</span
        >
      </h3>
    </div>
    <div class="progress">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: quizProgress }"
      ></div>
    </div>
  </div>
  <!-- accordion starts  -->
  <div
    v-if="categories.length"
    id="categoryAccordionFlush"
    class="accordion accordion-flush mb-2"
  >
    <div
      v-for="(category, categoryIndex) in categories"
      :key="categoryIndex"
      class="accordion-category pb-2"
    >
      <button
        class="accordion-button collapsed text-primary shadow-lg border border-light rounded py-4 fs-5 text-md-start"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#flush-collapseOne' + categoryIndex"
        aria-expanded="false"
        :aria-controls="'flush-collapseOne' + categoryIndex"
      >
        <FontAwesomeIcon
          class="pe-2"
          icon="fa-tags"
        />
        <h5 class="p-0 m-0">{{ category }}</h5>
      </button>
      <div
        :id="'flush-collapseOne' + categoryIndex"
        class="accordion-collapse collapse"
        aria-labelledby="flush-heading"
        data-bs-parent="#categoryAccordionFlush"
      >
        <ul class="list-unstyled">
          <li
            v-for="oneQuestion in questionArraysByCategory[category]"
            id="questionItem"
            :key="oneQuestion"
            class="row justify-content-center text-center text-md-start justify-content-md-between py-4 px-2 rounded-3 mx-auto ps-sm-3 border border-light my-3"
          >
            <div class="col-9 col-md-6 col-xl-7 col-xxl-8">
              <p>
                <span class="text-primary fs-5"
                  ><FontAwesomeIcon
                    class="pe-1"
                    icon="fa-circle-question"
                  />Question:</span
                >
                {{ oneQuestion.text }}
              </p>
              <p class="text-secondary mb-1 text-md-start pb-2 pb-md-0">
                <span class="text-primary"
                  ><FontAwesomeIcon
                    class="pe-1"
                    icon="fa-circle-check"
                  />Answer: </span
                >{{ oneQuestion.answer }}
              </p>
            </div>
            <div
              v-if="isModeReview"
              class="col-3 col-md-2 text-end p-0"
            >
              <FontAwesomeIcon
                id="deleteQuestionBtn"
                class="btn btn-outline-danger border-0 me-md-2"
                style="height: 50px"
                icon="fa-regular fa-square-minus"
                @click="deleteQuestion(oneQuestion.id, oneQuestion)"
              />
            </div>
            <!-- Loop for radios starts -->
            <div
              v-if="!isModeReview && oneQuestion.point > 1"
              class="col-12 col-md-6 col-xl-5 col-xxl-4 text-md-end"
            >
              <h5 class="text-primary">Answer</h5>
              <div
                v-for="idNumber in pointsArray(oneQuestion.point)"
                :key="idNumber"
                class="form-check form-check-inline me-0 ms-3"
              >
                <input
                  :id="oneQuestion.id"
                  class="form-check-input"
                  type="radio"
                  :value="idNumber"
                  :name="'radio' + oneQuestion.id"
                  @click="addPoint(idNumber, oneQuestion.id)"
                />
                <label
                  class="form-check-label"
                  for="answerCheckbox"
                  :value="idNumber"
                  >{{ idNumber }}</label
                >
              </div>
            </div>
            <!-- Loop for radios ends -->
            <div
              v-if="!isModeReview && oneQuestion.point === 1"
              class="col-12 col-md-6 col-xl-5 col-xxl-4 text-md-end"
            >
              <h5 class="mb-3 text-primary">Correct/Incorrect</h5>
              <EasySwitch
                :id="oneQuestion.id"
                @set-checked="addPoint"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- accordion ends -->
  </div>
  <div
    v-if="categories.length"
    class="text-center text-md-end pb-4"
  >
    <SubmitButton
      v-if="!isModeReview"
      @click="postQuiz"
      >Save Quiz</SubmitButton
    >
    <SubmitButton
      v-else
      @click="startQuiz"
      >Start Quiz</SubmitButton
    >
  </div>
  <div
    v-if="!categories.length"
    class="alert alert-primary d-flex align-items-center text-start mt-2"
    role="alert"
  >
    <font-awesome-icon icon="fa-solid fa-circle-info" />

    <p class="text-md-center text-md-start ps-2 m-0">
      Choosed questions will display here
    </p>
  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>
