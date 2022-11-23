<script setup lang="ts">
import { QuestionAnswer } from "../../../dto/results";

defineProps({
  oneQuestion: {
    type: Object as () => QuestionAnswer,
    required: true,
  },
});
</script>

<template>
  <!-- //NOSONAR -->
  <li
    class="border border-secondary mt-3 p-2 rounded-3 text-secondary mx-auto shadow-sm row"
  >
    <div class="col-12 col-md-9 ps-3">
      <div class="row">
        <p class="text-center text-md-start m-0">{{ oneQuestion.question }}</p>
      </div>
      <div class="row fst-italic">
        <p class="text-center text-md-start m-0">{{ oneQuestion.answer }}</p>
      </div>
    </div>
    <div class="col-12 col-md-3 ps-1">
      <div class="text-center text-md-end">
        Question score: {{ oneQuestion.questionScore }}
      </div>
      <div class="text-center text-md-end">
        Answer points: {{ oneQuestion.answerPoints }}
      </div>
    </div>
  </li>
</template>
