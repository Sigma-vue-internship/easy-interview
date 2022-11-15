<script setup>
import {ref} from 'vue';

const props = defineProps({
  item: Object,
});
const obj = ref(props.item);
</script>

<template>
  <li
    class="border border-secondary mt-3 p-2 rounded-3 text-secondary mx-auto shadow-sm"
  >
    <div class="row">
      <p class="text-center">
        {{ obj.question }}
      </p>
    </div>
    <div class="row">
      <p class="text-center fst-italic">
        {{ obj.answer }}
      </p>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 fw-bolder">
        {{ obj.category }}
      </div>
      <div class="col-12 col-md-4 fw-bolder">
        Answer points: {{ obj.answerPoints }}
      </div>
      <div class="col-12 col-md-4 fw-bolder">
        Question score: {{ obj.questionScore }}
      </div>
    </div>
  </li>
</template>

