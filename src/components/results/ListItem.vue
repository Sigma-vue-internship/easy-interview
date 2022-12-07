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
  <li
    class="border border-light mt-3 p-2 rounded-3 text-secondary mx-auto shadow-sm row"
  >
    <div class="col-12 col-md-9 ps-3 fs-5">
      <div class="row">
        <p class="text-center text-md-start m-0">
          Question: {{ oneQuestion.text }}
        </p>
      </div>
      <div class="row fst-italic">
        <p class="text-center text-md-start m-0">
          Answer: {{ oneQuestion.answer }}
        </p>
      </div>
    </div>
    <div class="col-12 col-md-3 ps-1 fs-5 text-end mb-2">
      <span class="text-primary bg-secondary p-2 rounded-circle">
        {{ oneQuestion.answerPoints }}/{{ oneQuestion.point }}
      </span>
    </div>
  </li>
</template>
