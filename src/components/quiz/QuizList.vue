<script setup lang="ts">
import { QuizQuestion } from "../../../dto/quiz";
import EditButton from "../common/EditButton.vue";
import DeleteButton from "../common/DeleteButton.vue";
import CheckboxItem from "./CheckboxItem.vue";

const props = defineProps({
  questionArray: {
    type: Array as () => QuizQuestion[],
    default: () => [],
  },
});

function postQuiz() {
  console.log(props.questionArray);
}

function deleteQuestion(index: number) {
  console.log(index);
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
  <h2 class="text-primary text-start mt-5">Question List</h2>
  <div v-if="props.questionArray?.length">
    <ul class="list-unstyled">
      <li
        v-for="(question, index) in questionArray"
        :key="index"
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-center text-md-start ps-sm-3"
      >
        <div class="row py-3 px-2">
          <div class="col-8">
            <h5 class="text-start">
              {{ question.text }}
            </h5>
            <p class="text-secondary mb-1">{{ question.answer }}</p>
            <p class="text-secondary mb-1">Category: {{ question.category }}</p>
          </div>
          <div
            v-show="question.point >= 1"
            class="col-4 text-start"
          >
            <h5 class="d-inline pe-3 text-primary">Answer:</h5>
            <div
              v-for="idNumber in pointsArray(question.point)"
              :key="idNumber"
              class="form-check form-check-inline"
            >
              <CheckboxItem :id-number="idNumber" />
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
</template>
