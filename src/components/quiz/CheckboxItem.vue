<script setup lang="ts">
import { ref } from "vue";

const checkedAnswer = ref([]);

const props = defineProps({
  idNumber: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div>
    <input
      :id="'answer' + props.idNumber"
      v-model="checkedAnswer"
      class="form-check-input"
      type="checkbox"
      :value="props.idNumber"
    />
    <label
      class="form-check-label"
      for="answerCheckbox"
      :value="props.idNumber"
      >{{ props.idNumber }}</label
    >
  </div>
</template>
