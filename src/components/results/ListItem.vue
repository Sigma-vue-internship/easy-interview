<script setup lang="ts">
import { QuestionAnswer } from "../../../dto/results";
import changeBarColor from "../../utils/useChangeColor";

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
    <div class="col-12 col-md-9 col-lg-10 ps-3 fs-5">
      <div class="row">
        <p class="text-center text-md-start mb-1">
          Question: {{ oneQuestion.text }}
        </p>
      </div>
      <div class="row fst-italic">
        <p class="text-center text-md-start m-0">
          Answer: {{ oneQuestion.answer }}
        </p>
      </div>
    </div>
    <div
      class="col-12 col-md-3 col-lg-2 ps-1 fs-5 d-flex justify-content-center justify-content-md-end"
    >
      <radial-progress-bar
        :diameter="60"
        inner-stroke-color="#555555"
        :stroke-width="7"
        :inner-stroke-width="5"
        :start-color="
          changeBarColor(oneQuestion.answerPoints, oneQuestion.point)
        "
        :stop-color="
          changeBarColor(oneQuestion.answerPoints, oneQuestion.point)
        "
        :completed-steps="oneQuestion.answerPoints"
        :total-steps="oneQuestion.point"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Answer score"
      >
        <span class="text-info"
          >{{ oneQuestion.answerPoints }}/{{ oneQuestion.point }}</span
        >
      </radial-progress-bar>
    </div>
  </li>
</template>
