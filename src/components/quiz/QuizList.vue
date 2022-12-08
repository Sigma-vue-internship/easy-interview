<script setup lang="ts">
import { QuizQuestion } from "../../../dto/quiz";
import _uniq from "lodash/uniq";
import SubmitButton from "../common/SubmitButton.vue";
import { Question } from "../../../dto/questions";

interface Emit {
  (e: "addPoint", point: number, id: string): void;
  (e: "deleteQuestion", index: number, item: Question): void;
  (e: "postQuiz");
  (e: "setMode"): void;
}

const props = defineProps({
  isModeReview: {
    type: Boolean,
    default: true,
  },
  questionArraysByCategory: {
    type: Object as () => Array<Question>,
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

function deleteQuestion(index: number, item: Question) {
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
  <h2 class="text-primary text-center text-md-start">Question List</h2>
  <div v-if="categories.length">
    <!-- collapse starts  -->
    <div
      v-for="(category, categoryIndex) in categories"
      :key="categoryIndex"
    >
      <p class="text-center text-md-start">
        <button
          class="btn btn-outline-primary mt-2"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapseButton' + categoryIndex"
          aria-expanded="false"
          :aria-controls="'collapseButton' + categoryIndex"
        >
          {{ category }}
        </button>
      </p>
      <div
        :id="'collapseButton' + categoryIndex"
        class="collapse multi-collapse"
      >
        <ul class="list-unstyled">
          <li
            v-for="(oneQuestion, index) in questionArraysByCategory[category]"
            id="questionItem"
            :key="oneQuestion"
            class="border border-light mb-3 p-2 rounded-3 mx-auto shadow text-center text-md-start ps-sm-3"
          >
            <div
              class="row py-3 justify-content-center justify-content-md-between align-items-center"
            >
              <div class="col-12 col-md-6 col-xl-7 col-xxl-8">
                <h5 class="text-center text-md-start">
                  {{ oneQuestion.text }}
                </h5>
                <p class="text-secondary mb-1 text-center text-md-start">
                  {{ oneQuestion.answer }}
                </p>
                <p class="text-secondary mb-1 text-center text-md-start">
                  Category: {{ oneQuestion.category }}
                </p>
              </div>
              <div
                v-if="isModeReview"
                class="col-12 col-md-2 text-md-end"
              >
                <FontAwesomeIcon
                  class="btn btn-outline-danger border-0 me-md-2"
                  style="height: 50px"
                  icon="fa-regular fa-square-minus"
                  @click="deleteQuestion(oneQuestion.id, oneQuestion)"
                />
              </div>
              <div
                v-if="!isModeReview"
                v-show="oneQuestion.point >= 1"
                class="col-12 col-md-6 col-xl-5 col-xxl-4"
              >
                <h5 class="d-inline pe-3 text-primary">Answer:</h5>
                <div
                  v-for="idNumber in pointsArray(oneQuestion.point)"
                  :key="idNumber"
                  class="form-check form-check-inline"
                >
                  <div>
                    <input
                      :id="oneQuestion.id"
                      class="form-check-input"
                      type="radio"
                      :value="idNumber"
                      :name="'radio' + index"
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
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- collapse ends -->
    <div class="text-center text-md-end pb-4">
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
  </div>
  <div v-else>
    <p class="text-center text-md-start">Choosed questions will display here</p>
  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>
