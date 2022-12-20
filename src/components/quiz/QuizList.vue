<script setup lang="ts">
import { QuizQuestion, CategoryQuestions } from "../../dto/quiz";
import _uniq from "lodash/uniq";
import SubmitButton from "../common/SubmitButton.vue";
import { Question } from "../../dto/questions";

interface Emit {
  (e: "addPoint", point: number, id: string): void;
  (e: "deleteQuestion", index: string, item: QuizQuestion): void;
  (e: "postQuiz");
  (e: "setMode"): void;
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
});
const emit = defineEmits<Emit>();

function startQuiz() {
  emit("setMode");
}

function postQuiz() {
  emit("postQuiz");
}

function deleteQuestion(index: number, item: QuizQuestion) {
  emit("deleteQuestion", index, item);
}

function addPoint(point: number, id: string) {
  emit("addPoint", point, id);
}

function pointsArray(point: number) {
  return Array.apply(null, Array(point + 1)).map((_, i: number) => i);
}
</script>

<template>
  <h2
    v-if="categories.length"
    class="text-primary text-md-start mb-4"
  >
    Question List
  </h2>
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
            class="row justify-content-md-between py-4 px-2 rounded-3 mx-auto ps-sm-3 border border-light my-3 align-items-center"
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
            <div
              v-if="!isModeReview && oneQuestion.point >= 1"
              class="col-12 col-md-6 col-xl-5 col-xxl-4"
            >
              <h5 class="d-inline pe-3 text-primary">Answer:</h5>
              <div
                v-for="idNumber in pointsArray(oneQuestion.point)"
                :key="idNumber"
                class="form-check form-check-inline"
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

    <p class="text-center text-md-start ps-2 m-0">
      Choosed questions will display here
    </p>
  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>
