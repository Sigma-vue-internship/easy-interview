<script setup lang="ts">
import { QuizQuestion } from "../../../dto/quiz";
import SubmitButton from "../common/SubmitButton.vue";
import DeleteButton from "../common/DeleteButton.vue";

interface Emit {
  (e: "addPoint", point: number, id: string): void;
  (e: "deleteQuestion", index: number): void;
  (e: "postQuiz");
}

const props = defineProps({
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
  questionArray: {
    type: Array as () => QuizQuestion[],
    default: () => [],
  },
});

const emit = defineEmits<Emit>();

function postQuiz() {
  emit("postQuiz");
}

function deleteQuestion(index: number) {
  emit("deleteQuestion", index);
}

function addPoint(point: number, id: string) {
  emit("addPoint", point, id);
}

function pointsArray(point: number) {
  return Array.apply(null, Array(point + 1)).map((_, i: number) => i);
}
</script>

<template>
  <h2 class="text-primary text-center text-md-start mt-5">Question List</h2>
  <div v-if="props.questionArray.length">
    <ul class="list-unstyled">
      <li
        v-for="(oneQuestion, index) in questionArray"
        :key="index"
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-center text-md-start ps-sm-3"
      >
        <div class="row py-3 px-2">
          <div class="col-12 col-xl-7 col-xxl-8">
            <h5 class="text-center text-xl-start">
              {{ oneQuestion.text }}
            </h5>
            <p class="text-secondary mb-1 text-center text-xl-start">
              {{ oneQuestion.answer }}
            </p>
            <p class="text-secondary mb-1 text-center text-xl-start">
              Category: {{ oneQuestion.category }}
            </p>
          </div>
          <div
            v-show="oneQuestion.point >= 1"
            class="col-12 col-xl-5 col-xxl-4 text-center text-xl-start"
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
            <div class="mt-4 me-2 text-md-end">
              <DeleteButton @click="deleteQuestion(index)" />
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="text-center text-md-end mt-md-4 ps-5 ps-md-2 pe-4 mb-3">
      <SubmitButton @click="postQuiz">Save Quiz</SubmitButton>
    </div>
  </div>
  <div v-else>
    <p class="text-center text-md-start">Choosed questions will display here</p>
  </div>
</template>
