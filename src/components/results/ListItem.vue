<script setup lang="ts">
const props = defineProps({
  question: String,
  questionScore: Number,
  answerPoints: Number,
  category: String,
  answer: String,
});
</script>

<template data-sly-template.step>
  <!-- //NOSONAR -->
  <li
    class="border border-secondary mt-3 p-2 rounded-3 text-secondary mx-auto shadow-sm row"
  >
    <div class="col-9 ps-3">
      <div class="row text-center text-md-start">
        {{ props.question }}
      </div>
      <div class="row text-center text-md-start fst-italic">
        {{ props.answer }}
      </div>
    </div>
    <div class="col-3">
      <div class="text-md-end">Question score: {{ props.questionScore }}</div>
      <div class="text-md-end">Answer points: {{ props.answerPoints }}</div>
    </div>
  </li>
</template>
