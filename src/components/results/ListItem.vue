<script setup lang="ts">
import { IResultAnswer } from "../../dto/results";
import { getBarColor, defaultBarColor } from "../../utils/useChangeColor";

defineProps({
  question: {
    type: Object as () => IResultAnswer,
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
          <span class="text-primary fs-5">
            <FontAwesomeIcon
              class="pe-1"
              icon="fa-circle-question"
            />
            Question:
          </span>
          {{ question.question.question }}
        </p>
      </div>
      <div class="row fst-italic">
        <p class="text-center text-md-start m-0 fs-6">
          <span class="text-primary">
            <FontAwesomeIcon
              class="pe-1"
              icon="fa-circle-check"
            />
            Answer:
          </span>
          {{ question.question.answer }}
        </p>
      </div>
    </div>
    <div
      class="col-12 col-md-3 col-lg-2 ps-1 fs-5 d-flex justify-content-center justify-content-md-end align-items-center"
    >
      <radial-progress-bar
        :diameter="60"
        :inner-stroke-color="defaultBarColor"
        :stroke-width="7"
        :inner-stroke-width="5"
        :start-color="
          getBarColor(question.question_point, question.question.max_point)
        "
        :stop-color="
          getBarColor(question.question_point, question.question.max_point)
        "
        :completed-steps="question.question_point"
        :total-steps="question.question.max_point"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Answer score"
      >
        <span class="text-info"
          >{{ question.question_point }}/{{ question.question.max_point }}</span
        >
      </radial-progress-bar>
    </div>
  </li>
</template>
